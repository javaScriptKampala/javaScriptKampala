'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Calendar, Zap, Github, CheckCircle, Ticket, MapPin, 
  Terminal, Activity, Users, Monitor, Play, RotateCcw, Trophy, Flame,
  Star, GitFork
} from 'lucide-react';
import { Button, Section, Card, Heading, Badge } from '../components/UI';
import { EVENTS, BLOG_POSTS, SPONSORS, PROJECTS } from '../data';

// --- ARCADE MATRIX GAME ---
const MatrixGame = () => {
  // Responsive Configuration
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value on client side
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const COLS = isMobile ? 8 : 16; // Fewer cols on mobile for bigger touch targets
  const ROWS = 10;
  const TOTAL_CELLS = COLS * ROWS;
  const TICK_RATE_MS = 150; // Speed of scanline
  const DECAY_RATE = 2.5; // Health loss per tick

  const [grid, setGrid] = useState<boolean[]>(Array(TOTAL_CELLS).fill(false));
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [currentCol, setCurrentCol] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Game Loop Refs
  const intervalRef = useRef<number | null>(null);
  const healthRef = useRef(100);

  // Reset grid when layout changes
  useEffect(() => {
      setGrid(Array(TOTAL_CELLS).fill(false));
      setGameState('IDLE');
      setScore(0);
      setHealth(100);
      if (intervalRef.current) clearInterval(intervalRef.current);
  }, [TOTAL_CELLS]);

  // Initialize High Score from local storage if possible (mocked here)
  useEffect(() => {
    const saved = localStorage.getItem('jskla_highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const startGame = () => {
    setGrid(Array(TOTAL_CELLS).fill(false));
    setScore(0);
    setHealth(100);
    healthRef.current = 100;
    setGameState('PLAYING');
    setCurrentCol(0);
  };

  const stopGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setGameState('GAMEOVER');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('jskla_highscore', score.toString());
    }
  };

  // Game Tick Logic
  useEffect(() => {
    if (gameState !== 'PLAYING') {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
    }

    intervalRef.current = window.setInterval(() => {
        setCurrentCol((prev) => {
            const nextCol = (prev + 1) % COLS;
            processColumn(nextCol);
            return nextCol;
        });

        // Health Decay
        setHealth((prev) => {
            const next = prev - DECAY_RATE;
            healthRef.current = next;
            if (next <= 0) {
                stopGame();
                return 0;
            }
            return next;
        });

    }, TICK_RATE_MS);

    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameState, grid, COLS]); 

  const processColumn = (colIndex: number) => {
      setGrid((currentGrid) => {
          const newGrid = [...currentGrid];
          let hits = 0;
          let colFull = true;

          for (let r = 0; r < ROWS; r++) {
              const cellIndex = r * COLS + colIndex;
              if (newGrid[cellIndex]) {
                  hits++;
                  newGrid[cellIndex] = false; // CONSUME CELL
              } else {
                  colFull = false;
              }
          }

          if (hits > 0) {
              const points = (hits * 10) + (colFull ? 500 : 0); // Bonus for full column
              const healthGain = (hits * 3) + (colFull ? 20 : 0);
              
              setScore(s => s + points);
              setHealth(h => Math.min(100, h + healthGain));
          }

          return newGrid;
      });
  };

  const toggleCell = (index: number) => {
    if (gameState !== 'PLAYING') return;
    setGrid(prev => {
        const next = [...prev];
        next[index] = true; 
        return next;
    });
  };

  const handleMouseEnter = (index: number) => {
    if (isDrawing && gameState === 'PLAYING') {
       toggleCell(index);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameState !== 'PLAYING') return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const indexStr = element?.getAttribute('data-index');
    if (indexStr) {
        const index = parseInt(indexStr, 10);
        toggleCell(index);
    }
  };

  return (
    <div 
        className="w-full h-full bg-[#050505] relative flex flex-col select-none overflow-hidden border-l border-gray-800 touch-none"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={handleTouchMove}
    >
        {/* HUD */}
        <div className="h-16 border-b border-gray-800 bg-[#0a0a0a] flex items-center justify-between px-6 relative z-20">
            <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">System Integrity</span>
                <div className="w-24 md:w-32 h-2 bg-gray-800 rounded-none overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-200 ${health > 50 ? 'bg-green-500' : health > 20 ? 'bg-js-yellow' : 'bg-red-500'}`} 
                        style={{ width: `${health}%` }}
                    ></div>
                </div>
            </div>

            <div className="text-center">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Current Score</div>
                <div className="text-2xl font-black text-white font-mono leading-none tracking-tighter">
                    {score.toString().padStart(6, '0')}
                </div>
            </div>

            <div className="text-right hidden sm:block">
                 <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">High Score</div>
                 <div className="text-js-yellow font-bold font-mono">{highScore.toString().padStart(6, '0')}</div>
            </div>
        </div>

        {/* Game Area */}
        <div className="flex-grow p-4 flex items-center justify-center relative bg-[#080808]">
            {/* Scanline Visual */}
            {gameState === 'PLAYING' && (
                <div 
                    className="absolute top-0 bottom-0 pointer-events-none z-10 border-l-2 border-js-yellow shadow-[0_0_30px_rgba(247,223,30,0.5)] transition-all duration-150 ease-linear"
                    style={{ left: `calc(${((currentCol) / COLS) * 100}% + 20px)` }} // Offset for padding approx
                ></div>
            )}

            <div 
                className="grid gap-1 w-full h-full max-h-[500px]"
                style={{ 
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`
                }}
            >
                {grid.map((active, i) => {
                    const col = i % COLS;
                    const isScanCol = col === currentCol && gameState === 'PLAYING';
                    
                    return (
                        <div
                            key={i}
                            data-index={i}
                            onMouseDown={() => toggleCell(i)}
                            onMouseEnter={() => handleMouseEnter(i)}
                            className={`
                                relative cursor-pointer transition-colors duration-75
                                ${active ? 'bg-js-yellow' : 'bg-[#151515] hover:bg-[#222]'}
                                ${isScanCol ? 'opacity-80' : 'opacity-100'}
                                ${active && isScanCol ? 'bg-white scale-110 shadow-[0_0_10px_white] z-20' : ''}
                            `}
                        ></div>
                    );
                })}
            </div>

            {/* OVERLAYS */}
            {gameState === 'IDLE' && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center animate-in fade-in">
                    <Heading level={3} className="mb-2 text-white text-center">System Offline</Heading>
                    <p className="text-gray-400 font-mono text-xs uppercase mb-8 tracking-widest text-center px-4">Feed the matrix to survive</p>
                    
                    <button 
                        onClick={startGame}
                        className="group relative flex flex-col items-center justify-center"
                    >
                        <div className="w-24 h-24 bg-js-yellow flex items-center justify-center rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(247,223,30,0.3)]">
                            <Play size={48} className="text-black ml-2 fill-black" />
                        </div>
                        <Badge color="yellow">INITIALIZE</Badge>
                    </button>
                </div>
            )}

            {gameState === 'GAMEOVER' && (
                <div className="absolute inset-0 bg-red-900/90 backdrop-blur-md z-30 flex flex-col items-center justify-center animate-in zoom-in duration-300">
                    <Flame size={64} className="text-white mb-4 animate-bounce" />
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-2 tracking-tighter text-center">System Failure</h2>
                    <div className="bg-black/50 p-6 border border-white/20 mb-8 text-center min-w-[280px]">
                        <div className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">Final Score</div>
                        <div className="text-5xl font-black text-js-yellow font-mono mb-4">{score}</div>
                        {score >= highScore && score > 0 && (
                            <div className="inline-flex items-center gap-2 text-green-400 font-bold uppercase text-xs tracking-widest animate-pulse">
                                <Trophy size={14} /> New Record
                            </div>
                        )}
                    </div>
                    
                    <Button onClick={startGame} variant="outline" className="border-white text-white hover:bg-white hover:text-red-900">
                        <RotateCcw size={18} className="mr-2" /> Reboot
                    </Button>
                </div>
            )}
        </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col lg:flex-row border-b border-gray-800 bg-js-black overflow-hidden">
      {/* LEFT SIDE: Content */}
      <div className="w-full lg:w-1/2 flex items-center bg-js-black p-8 md:p-16 lg:p-24 relative border-b lg:border-b-0 lg:border-r border-gray-800 z-10">
         <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gray-900 border border-gray-800 text-js-yellow px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest mb-8">
               <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
               JS_KLA SYSTEM v3.0 // ONLINE
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase">
              Build<br/>
              <span className="text-transparent bg-clip-text bg-none stroke-white" style={{WebkitTextStroke: '2px white'}}>The</span><br/>
              <span className="text-js-yellow">Future</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed max-w-lg border-l-4 border-js-yellow pl-6">
              The premier engineering collective in Uganda. We don't just write code; we architect ecosystems and empower the next generation of builders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/join" icon={Zap} className="w-full sm:w-auto">
                Join Network
              </Button>
              <Button variant="outline" href="/events" icon={Calendar} className="w-full sm:w-auto">
                View Schedule
              </Button>
            </div>
         </div>
      </div>

      {/* RIGHT SIDE: Interactive Matrix Game */}
      <div className="w-full lg:w-1/2 relative bg-[#050505] min-h-[500px] lg:min-h-auto">
         <MatrixGame />
      </div>
    </div>
  );
};

const MetricsStrip = () => (
    <div className="bg-js-yellow border-b border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center border-r border-black/10 last:border-0 p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Users size={20} className="text-black/50" />
                    <div className="text-5xl font-black text-black tracking-tighter">5K+</div>
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-black/60">Active Members</div>
            </div>
            <div className="text-center border-r border-black/10 last:border-0 p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar size={20} className="text-black/50" />
                    <div className="text-5xl font-black text-black tracking-tighter">120+</div>
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-black/60">Events Hosted</div>
            </div>
            <div className="text-center border-r border-black/10 last:border-0 p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Terminal size={20} className="text-black/50" />
                    <div className="text-5xl font-black text-black tracking-tighter">50+</div>
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-black/60">Open Projects</div>
            </div>
            <div className="text-center md:border-r-0 p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Activity size={20} className="text-black/50" />
                    <div className="text-5xl font-black text-black tracking-tighter">7</div>
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-black/60">Years Active</div>
            </div>
        </div>
    </div>
);

const FeaturedEvent = () => {
  const nextEvent = EVENTS.find(e => e.status === 'upcoming');
  if (!nextEvent) return null;

  return (
    <Section className="bg-js-black border-b border-gray-800" noPadding>
      <div className="grid lg:grid-cols-2 min-h-[600px]">
         {/* Text Content Left */}
         <div className="p-12 lg:p-24 flex flex-col justify-center bg-[#080808]">
            <div className="mb-8 flex items-center gap-3">
               <Badge color="yellow">Upcoming Summit</Badge>
               <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">Don't miss out</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 uppercase leading-[0.9] tracking-tighter">{nextEvent.title}</h2>
            
            <div className="space-y-6 mb-12 border-t border-gray-800 pt-8">
               <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#151515] border border-gray-800 flex items-center justify-center text-js-yellow">
                    <Calendar size={20} />
                  </div>
                  <div>
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Date & Time</div>
                     <div className="text-white text-lg font-bold">{new Date(nextEvent.date).toLocaleDateString()} — {nextEvent.time}</div>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#151515] border border-gray-800 flex items-center justify-center text-js-yellow">
                    <MapPin size={20} />
                  </div>
                  <div>
                     <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Location</div>
                     <div className="text-white text-lg font-bold">{nextEvent.venue}</div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <Button href={nextEvent.ticketsUrl} icon={Ticket} className="w-full sm:w-auto">Reserve Seat</Button>
               <Button variant="outline" href={`/events/${nextEvent.slug}`} className="w-full sm:w-auto">Event Details</Button>
            </div>
         </div>

         {/* Image Content Right */}
         <div className="relative h-[400px] lg:h-auto border-t lg:border-t-0 lg:border-l border-gray-800 overflow-hidden group">
            <div className="absolute inset-0 bg-js-yellow opacity-0 group-hover:opacity-10 transition-opacity z-10 mix-blend-overlay"></div>
            <img 
               src={nextEvent.coverImage} 
               alt={nextEvent.title} 
               className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8 z-20">
                <div className="text-white font-mono text-xs uppercase tracking-widest mb-2">Featured Event</div>
             </div>
         </div>
      </div>
    </Section>
  );
};

const MembershipSection = () => (
  <Section className="bg-[#050505] border-b border-gray-800">
     <div className="text-center mb-20 max-w-3xl mx-auto">
        <Heading level={2} className="mb-6">The Network</Heading>
        <p className="text-gray-400 text-lg font-light leading-relaxed">
            Choose your path. Whether you are learning, building, or hiring, we have a place for you in the ecosystem.
        </p>
     </div>

     <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
        {/* Tier 1 */}
        <div className="bg-[#111] border border-gray-800 p-10 flex flex-col hover:border-gray-600 transition-colors h-full">
           <div className="text-gray-500 font-mono text-xs mb-4 uppercase tracking-widest">/ TIER_01</div>
           <h3 className="text-2xl font-black text-white uppercase mb-4">Explorer</h3>
           <p className="text-gray-400 text-sm mb-8 h-12">For students and hobbyists starting their journey into the JavaScript ecosystem.</p>
           <div className="text-5xl font-black text-white mb-8">$0</div>
           <ul className="space-y-4 mb-10 flex-grow border-t border-gray-800 pt-8">
              <li className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase"><CheckCircle size={16}/> Monthly Meetups</li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase"><CheckCircle size={16}/> Discord Access</li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase"><CheckCircle size={16}/> Newsletter</li>
           </ul>
           <Button variant="outline" className="w-full">Join Free</Button>
        </div>

        {/* Tier 2 - Pro (Pop out) */}
        <div className="bg-white border-2 border-white p-10 flex flex-col transform md:-translate-y-6 shadow-[20px_20px_0px_0px_rgba(247,223,30,1)] relative h-full">
           <div className="absolute top-0 right-0 bg-js-yellow text-black text-xs font-black px-4 py-2 uppercase tracking-widest">Recommended</div>
           <div className="text-black font-mono text-xs mb-4 uppercase tracking-widest">/ TIER_02</div>
           <h3 className="text-2xl font-black text-black uppercase mb-4">Professional</h3>
           <p className="text-gray-600 text-sm mb-8 h-12">For engineers seeking mastery, mentorship, and career acceleration.</p>
           <div className="text-5xl font-black text-black mb-8">$50<span className="text-lg align-top text-gray-500">/yr</span></div>
           <ul className="space-y-4 mb-10 flex-grow border-t border-gray-200 pt-8">
              <li className="flex items-center gap-3 text-black text-sm font-bold uppercase"><CheckCircle size={16}/> Priority Seating</li>
              <li className="flex items-center gap-3 text-black text-sm font-bold uppercase"><CheckCircle size={16}/> Exclusive Workshops</li>
              <li className="flex items-center gap-3 text-black text-sm font-bold uppercase"><CheckCircle size={16}/> Mentorship Program</li>
              <li className="flex items-center gap-3 text-black text-sm font-bold uppercase"><CheckCircle size={16}/> Annual Swag Pack</li>
           </ul>
           <Button className="w-full bg-black text-white border-black hover:bg-gray-800 hover:border-gray-800">Get Started</Button>
        </div>

        {/* Tier 3 */}
        <div className="bg-[#111] border border-gray-800 p-10 flex flex-col hover:border-gray-600 transition-colors h-full">
           <div className="text-gray-500 font-mono text-xs mb-4 uppercase tracking-widest">/ TIER_03</div>
           <h3 className="text-2xl font-black text-white uppercase mb-4">Partner</h3>
           <p className="text-gray-400 text-sm mb-8 h-12">For organizations looking to hire talent and support the local ecosystem.</p>
           <div className="text-5xl font-black text-white mb-8">CUSTOM</div>
           <ul className="space-y-4 mb-10 flex-grow border-t border-gray-800 pt-8">
              <li className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase"><CheckCircle size={16}/> Hiring Pipeline</li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase"><CheckCircle size={16}/> Brand Visibility</li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase"><CheckCircle size={16}/> Speaking Slots</li>
           </ul>
           <Button variant="outline" className="w-full">Contact Us</Button>
        </div>
     </div>
  </Section>
);

const Projects = () => (
  <Section className="bg-[#080808] border-b border-gray-800">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-800 pb-8">
       <div>
         <Heading level={2}>The Forge</Heading>
         <p className="text-gray-400 mt-4 max-w-xl font-light">
            Our digital footprint. Tools, libraries, and resources built by Kampala engineers, used globally.
         </p>
       </div>
       <Button variant="outline" href="https://github.com/kampala-js" icon={Github} className="mt-8 md:mt-0">GitHub Org</Button>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {PROJECTS.map((project) => (
        <Card key={project.id} className="p-8 group hover:bg-[#151515] transition-colors h-full flex flex-col">
           <div className="flex justify-between items-start mb-6">
              <div className="font-mono text-xs text-js-yellow mb-2 uppercase tracking-widest px-2 py-1 bg-js-yellow/10 border border-js-yellow/20">
                {project.author}
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-1 text-gray-500 text-xs font-bold font-mono group-hover:text-white">
                    <Star size={14} /> {project.stars}
                 </div>
                 <div className="flex items-center gap-1 text-gray-500 text-xs font-bold font-mono group-hover:text-white">
                    <GitFork size={14} /> 12
                 </div>
              </div>
           </div>
           <h3 className="text-3xl font-black text-white mb-4 uppercase group-hover:text-js-yellow transition-colors">{project.title}</h3>
           <p className="text-gray-400 mb-8 leading-relaxed font-light flex-grow">{project.description}</p>
           <div className="flex gap-2 border-t border-gray-800 pt-6">
              {project.technologies.map(tech => (
                 <span key={tech} className="border border-gray-700 text-gray-400 text-[10px] px-2 py-1 uppercase font-bold tracking-widest hover:border-white hover:text-white transition-colors">{tech}</span>
              ))}
           </div>
        </Card>
      ))}
    </div>
  </Section>
);

const LatestBlog = () => (
  <Section className="bg-js-black">
    <div className="flex justify-between items-end mb-16">
       <div>
          <Heading level={2}>Intel</Heading>
          <p className="text-gray-400 mt-4 font-light">Latest insights, tutorials, and announcements.</p>
       </div>
       <Link href="/blog" className="text-js-yellow font-bold uppercase tracking-widest hover:text-white text-sm border-b-2 border-js-yellow pb-1">Read All</Link>
    </div>
    <div className="grid lg:grid-cols-3 gap-0 border border-gray-800">
       {BLOG_POSTS.slice(0, 3).map((post) => (
         <Link href={`/blog/${post.slug}`} key={post.slug} className="group block border-b lg:border-b-0 lg:border-r border-gray-800 last:border-0 bg-[#080808] hover:bg-[#111] p-10 transition-colors">
            <div className="text-xs text-gray-500 font-mono mb-4 flex items-center gap-2">
                <Monitor size={12} />
                <span>{post.date}</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase mb-4 group-hover:text-js-yellow transition-colors leading-tight">{post.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-3 font-light mb-8 leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-js-yellow transition-colors">
               Read Brief <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
            </div>
         </Link>
       ))}
    </div>
  </Section>
);

const SponsorsStrip = () => (
  <div className="py-24 bg-js-yellow text-black border-t border-black">
    <div className="max-w-7xl mx-auto px-4 text-center">
       <div className="text-xs font-black uppercase tracking-[0.3em] mb-12 border-b-2 border-black inline-block pb-3">Powered By</div>
       <div className="flex flex-col md:flex-row flex-wrap justify-center gap-16 md:gap-24 opacity-80 mix-blend-multiply">
         {SPONSORS.map(s => (
           <img key={s.id} src={s.logo} alt={s.name} className="h-8 md:h-12 object-contain hover:grayscale hover:opacity-100 transition-all duration-300" />
         ))}
       </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <FeaturedEvent />
      <MembershipSection />
      <Projects />
      <LatestBlog />
      <SponsorsStrip />
    </>
  );
}
