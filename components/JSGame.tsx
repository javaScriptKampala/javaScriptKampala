"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface Logo {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
}

type GameState = "idle" | "playing" | "over";

const CANVAS_BG = "#0F172A";
const JS_YELLOW = "#F7DF1E";
const LOGO_SIZE = 40;
const SPAWN_INTERVAL = 800;
const GAME_DURATION = 60;
const MIN_SPEED_FACTOR = 0.5;
const MAX_SPEED_FACTOR = 2.0;
const SPEED_INCREMENT = 0.03;
const VISIBILITY_THRESHOLD = 0.1;

function TerminalFallback() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const sequence = [
      { text: "> npm install jskampala", delay: 0 },
      { text: "> community connected ✔", delay: 1200 },
    ];

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ text, delay }) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center justify-center rounded-lg border border-gray-800 bg-[#0F172A] p-6 font-mono text-sm text-green-400">
      <div className="space-y-2">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        {lines.length < 2 && (
          <span className="inline-block h-4 w-2 animate-pulse bg-green-400" />
        )}
      </div>
    </div>
  );
}

export default function JSGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<Logo[]>([]);
  const scoreRef = useRef(0);
  const timeRef = useRef(GAME_DURATION);
  const nextIdRef = useRef(0);
  const rafRef = useRef<number>(0);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const baseSpeedRef = useRef(1.5);

  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const clearTimers = useCallback(() => {
    if (spawnRef.current) {
      clearInterval(spawnRef.current);
      spawnRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const gameLoopRef = useRef<() => void>(() => {});

  useEffect(() => {
    gameLoopRef.current = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!pausedRef.current) {
        const w = canvas.width;
        const h = canvas.height;

        logosRef.current = logosRef.current
          .map((logo) => ({ ...logo, y: logo.y + logo.speed }))
          .filter((logo) => logo.y < h + logo.size);

        // draw
        ctx.fillStyle = CANVAS_BG;
        ctx.fillRect(0, 0, w, h);

        for (const logo of logosRef.current) {
          ctx.fillStyle = JS_YELLOW;
          ctx.fillRect(logo.x, logo.y, logo.size, logo.size);
          ctx.fillStyle = "#000";
          ctx.font = "bold 16px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("JS", logo.x + logo.size / 2, logo.y + logo.size / 2);
        }

        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(`Score: ${scoreRef.current}`, 16, 16);
        ctx.textAlign = "right";
        ctx.fillText(`${timeRef.current}s`, w - 16, 16);
      }

      rafRef.current = requestAnimationFrame(gameLoopRef.current);
    };
  });

  const spawnLogo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || pausedRef.current) return;

    const speedVariation = MIN_SPEED_FACTOR + Math.random() * (MAX_SPEED_FACTOR - MIN_SPEED_FACTOR);
    const logo: Logo = {
      id: nextIdRef.current++,
      x: Math.random() * (canvas.width - LOGO_SIZE),
      y: -LOGO_SIZE,
      speed: baseSpeedRef.current * speedVariation,
      size: LOGO_SIZE,
    };
    logosRef.current.push(logo);
  }, []);

  const startGame = useCallback(() => {
    logosRef.current = [];
    scoreRef.current = 0;
    timeRef.current = GAME_DURATION;
    nextIdRef.current = 0;
    baseSpeedRef.current = 1.5;
    pausedRef.current = false;

    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState("playing");

    clearTimers();

    spawnRef.current = setInterval(spawnLogo, SPAWN_INTERVAL);

    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;

      timeRef.current -= 1;
      baseSpeedRef.current += SPEED_INCREMENT;
      setTimeLeft(timeRef.current);

      if (timeRef.current <= 0) {
        clearTimers();
        setScore(scoreRef.current);
        setGameState("over");
      }
    }, 1000);

    rafRef.current = requestAnimationFrame(gameLoopRef.current);
  }, [clearTimers, spawnLogo]);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (gameState !== "playing") return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      const hitIndex = logosRef.current.findIndex(
        (logo) =>
          clickX >= logo.x &&
          clickX <= logo.x + logo.size &&
          clickY >= logo.y &&
          clickY <= logo.y + logo.size
      );

      if (hitIndex !== -1) {
        logosRef.current.splice(hitIndex, 1);
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }
    },
    [gameState]
  );

  // Resize canvas to container
  useEffect(() => {
    if (isSmallScreen) return;

    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isSmallScreen]);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    if (isSmallScreen) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting;
      },
      { threshold: VISIBILITY_THRESHOLD }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isSmallScreen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  if (isSmallScreen) {
    return <TerminalFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-800"
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="block h-full w-full cursor-crosshair"
      />

      {gameState === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0F172A]/90">
          <div className="flex h-16 w-16 items-center justify-center bg-[#F7DF1E]">
            <span className="text-2xl font-bold text-black">JS</span>
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-gray-400">
            Catch the JS Logos
          </p>
          <button
            onClick={startGame}
            className="rounded border border-[#F7DF1E] px-6 py-2 font-mono text-sm uppercase tracking-wider text-[#F7DF1E] transition-colors hover:bg-[#F7DF1E] hover:text-black"
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="pointer-events-none absolute left-0 top-0 flex w-full justify-between p-4 font-mono text-sm text-white">
          <span>Score: {score}</span>
          <span>{timeLeft}s</span>
        </div>
      )}

      {gameState === "over" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0F172A]/90">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-white">
            Game Over
          </h2>
          <p className="font-mono text-4xl font-bold text-[#F7DF1E]">{score}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
            JS Logos Caught
          </p>
          <button
            onClick={startGame}
            className="rounded border border-[#F7DF1E] px-6 py-2 font-mono text-sm uppercase tracking-wider text-[#F7DF1E] transition-colors hover:bg-[#F7DF1E] hover:text-black"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
