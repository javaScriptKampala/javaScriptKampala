'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Calendar, Zap, Github, CheckCircle, Ticket, MapPin,
  Terminal, Activity, Users, Monitor, Play,
  Star, GitFork
} from 'lucide-react';
import { Button, Section, Card, Heading, Badge } from '../components/UI';
import { EVENTS, BLOG_POSTS, SPONSORS, PROJECTS } from '../data';
const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {}); // handle autoplay block gracefully
    } else {
      video.pause();
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] relative flex flex-col overflow-hidden border-l border-gray-800 my-4">
      {/* Header bar – slightly more compact on mobile */}
      <div className="h-14 sm:h-16 border-b border-gray-800 bg-[#0a0a0a] flex items-center justify-between px-4 sm:px-6 relative z-20">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">Spotlight</span>
          <div className="text-xs font-mono uppercase tracking-widest text-js-yellow">Community Reel</div>
        </div>
        <div className="text-right hidden xs:block">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">Runtime</div>
          <div className="text-js-yellow font-bold font-mono text-sm">02:34</div>
        </div>
      </div>

      {/* Main video area – mobile-first aspect + safe max height */}
      <div className="grow relative bg-[#080808] flex items-center justify-center p-3 sm:p-4 lg:p-6 h-125">
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-[min(94%,1200px)] mx-auto h-full sm:h-auto aspect-[9/16] xs:aspect-[4/5] sm:aspect-video bg-[#0b0b0b] border border-gray-800 shadow-[0_0_60px_rgba(247,223,30,0.12)] relative overflow-hidden">
            {/* Video wrapper with gradient overlay */}
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="/test-video.mp4"
                preload="metadata"
                playsInline
                muted
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlayback}
              />
              <div className="absolute inset-0 bg-linear-to-br from-black/55 via-transparent to-black/75 pointer-events-none" />

              {!isPlaying && (
                <button
                  className="absolute inset-0 flex flex-col items-center justify-center group touch-manipulation"
                  aria-label="Play community reel"
                  onClick={togglePlayback}
                >
                  <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 bg-js-yellow rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(247,223,30,0.4)] group-hover:scale-105 group-active:scale-95 transition-transform duration-200">
                    <Play size={40} className="text-black ml-1.5 fill-black xs:size-12 sm:size-[52px]" />
                  </div>
                  <div className="mt-5 xs:mt-6 text-js-yellow font-mono text-xs xs:text-sm uppercase tracking-[0.3em] text-center px-5 sm:px-0">
                    Watch The Network
                  </div>
                </button>
              )}
            </div>

            <div className="absolute left-0 right-0 bottom-0 px-4 sm:px-6 py-3.5 sm:py-4 border-t border-gray-800 flex items-center justify-between bg-black/65 backdrop-blur-md">
              <div>
                <div className="text-white font-black uppercase tracking-widest text-sm sm:text-base">Kampala JS</div>
                <div className="text-gray-400 text-[11px] sm:text-xs font-mono uppercase tracking-widest mt-0.5">Community Reel</div>
              </div>
              <Badge color="yellow">FEATURED</Badge>
            </div>
          </div>
        </div>
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

      {/* RIGHT SIDE: Video Feature */}
      <div className="w-full lg:w-1/2 relative bg-[#050505] --h-125 --lg:min-h-auto">
         <HeroVideo />
      </div>
    </div>
  );
};

// const MetricsStrip = () => (
//     <div className="bg-js-yellow border-b border-gray-800 py-16">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
//             <div className="text-center border-r border-black/10 last:border-0 p-4">
//                 <div className="flex items-center justify-center gap-2 mb-2">
//                     <Users size={20} className="text-black/50" />
//                     <div className="text-5xl font-black text-black tracking-tighter">5K+</div>
//                 </div>
//                 <div className="text-xs font-black uppercase tracking-widest text-black/60">Active Members</div>
//             </div>
//             <div className="text-center border-r border-black/10 last:border-0 p-4">
//                 <div className="flex items-center justify-center gap-2 mb-2">
//                     <Calendar size={20} className="text-black/50" />
//                     <div className="text-5xl font-black text-black tracking-tighter">120+</div>
//                 </div>
//                 <div className="text-xs font-black uppercase tracking-widest text-black/60">Events Hosted</div>
//             </div>
//             <div className="text-center border-r border-black/10 last:border-0 p-4">
//                 <div className="flex items-center justify-center gap-2 mb-2">
//                     <Terminal size={20} className="text-black/50" />
//                     <div className="text-5xl font-black text-black tracking-tighter">50+</div>
//                 </div>
//                 <div className="text-xs font-black uppercase tracking-widest text-black/60">Open Projects</div>
//             </div>
//             <div className="text-center md:border-r-0 p-4">
//                 <div className="flex items-center justify-center gap-2 mb-2">
//                     <Activity size={20} className="text-black/50" />
//                     <div className="text-5xl font-black text-black tracking-tighter">7</div>
//                 </div>
//                 <div className="text-xs font-black uppercase tracking-widest text-black/60">Years Active</div>
//             </div>
//         </div>
//     </div>
// );

const MetricsStrip = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  
  const stats = [
    { target: 5000, label: 'Active Members', icon: Users, suffix: '+' },
    { target: 120, label: 'Events Hosted', icon: Calendar, suffix: '+' },
    { target: 50, label: 'Open Projects', icon: Terminal, suffix: '+' },
    { target: 7, label: 'Years Active', icon: Activity, suffix: '' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const durations = [2000, 1800, 1600, 1400];
          stats.forEach((stat, index) => {
            const duration = durations[index];
            const step = stat.target / (duration / 20); // Update every 20ms
            let current = 0;
            
            const timer = setInterval(() => {
              current += step;
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
              }
              
              setCounts(prev => {
                const newCounts = [...prev];
                newCounts[index] = Math.floor(current);
                return newCounts;
              });
            }, 20);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  return (
    <div ref={ref} className="bg-js-yellow border-b border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center border-r border-black/10 last:border-0 p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <stat.icon size={20} className="text-black/50" />
              <div className="text-5xl font-black text-black tracking-tighter">
                {counts[index].toLocaleString()}{stat.suffix}
              </div>
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-black/60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const FeaturedEvent = () => {
  const nextEvent = EVENTS.find(e => e.status === 'upcoming');
  if (!nextEvent) return null;

  return (
    <Section className="bg-js-black border-b border-gray-800" noPadding>
      <div className="grid lg:grid-cols-2 min-h-150">
        {/* Text Content Left */}
        <div className="p-12 lg:p-24 flex flex-col justify-center bg-[#080808]">
          <div className="mb-8 flex items-center gap-3">
            <Badge color="yellow">Upcoming Summit</Badge>
            <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">
              Don't miss out
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 uppercase leading-[0.9] tracking-tighter">
            {nextEvent.title}
          </h2>

          <div className="space-y-6 mb-12 border-t border-gray-800 pt-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#151515] border border-gray-800 flex items-center justify-center text-js-yellow">
                <Calendar size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Date & Time
                </div>
                <div className="text-white text-lg font-bold">
                  {new Date(nextEvent.date).toLocaleDateString("en-UG", {
                    timeZone: "Africa/Kampala",
                  })}
                  — {nextEvent.time}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#151515] border border-gray-800 flex items-center justify-center text-js-yellow">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Location
                </div>
                <div className="text-white text-lg font-bold">
                  {nextEvent.venue}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              href={nextEvent.ticketsUrl}
              icon={Ticket}
              className="w-full sm:w-auto"
            >
              Reserve Seat
            </Button>
            <Button
              variant="outline"
              href={`/events/${nextEvent.slug}`}
              className="w-full sm:w-auto"
            >
              Event Details
            </Button>
          </div>
        </div>

        {/* Image Content Right */}
        <div className="relative h-100 lg:h-auto border-t lg:border-t-0 lg:border-l border-gray-800 overflow-hidden group">
          <div className="absolute inset-0 bg-js-yellow opacity-0 group-hover:opacity-10 transition-opacity z-10 mix-blend-overlay"></div>
          <img
            src={nextEvent.coverImage}
            alt={nextEvent.title}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black to-transparent p-8 z-20">
            <div className="text-white font-mono text-xs uppercase tracking-widest mb-2">
              Featured Event
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

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
           <p className="text-gray-400 mb-8 leading-relaxed font-light grow">{project.description}</p>
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
       <div className="flex flex-wrap justify-center gap-16 md:gap-24 grayscale opacity-80 mix-blend-multiply">
         {SPONSORS.map(s => (
           <img key={s.id} src={s.logo} alt={s.name} className="h-8 md:h-12 object-contain hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
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
      <SponsorsComponent />

      <Projects />
      <LatestBlog />
      <SponsorsStrip />
    </>
  );
}
