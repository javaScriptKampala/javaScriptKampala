import React from 'react';
import { BookOpen, Code, Server, Layers, ExternalLink, Users, ArrowRight, Terminal } from 'lucide-react';
import { Section, Heading, Card, Button, Badge } from '../../components/UI';

export default function Learning() {
  const tracks = [
    {
      title: 'Frontend Fundamentals',
      level: 'Beginner',
      icon: Layers,
      description: 'Master HTML, CSS, and vanilla JavaScript. The building blocks of the web.',
      topics: ['Semantic HTML', 'CSS Layouts', 'DOM', 'ES6+']
    },
    {
      title: 'Modern React',
      level: 'Intermediate',
      icon: Code,
      description: 'Deep dive into React, Hooks, and modern frameworks like Next.js.',
      topics: ['Hooks', 'State', 'Next.js', 'Tailwind']
    },
    {
      title: 'Backend Engineering',
      level: 'Advanced',
      icon: Server,
      description: 'Build robust server-side applications with Node.js and databases.',
      topics: ['Node.js', 'PostgreSQL', 'Docker', 'API Design']
    }
  ];

  const resources = [
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', desc: 'The definitive documentation.' },
    { title: 'JavaScript.info', url: 'https://javascript.info', desc: 'Modern JS tutorial.' },
    { title: 'FreeCodeCamp', url: 'https://www.freecodecamp.org', desc: 'Interactive coding challenges.' },
    { title: 'Patterns.dev', url: 'https://patterns.dev', desc: 'Architecture patterns.' }
  ];

  return (
    <div className="bg-js-black min-h-screen">
      {/* Hero */}
      <div className="bg-[#050505] border-b border-gray-800 pt-32 pb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-js-yellow/5 skew-x-12 transform origin-top-right pointer-events-none"></div>
         <Section noPadding>
            <div className="max-w-4xl">
               <Badge color="yellow" className="mb-6">Education</Badge>
               <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-[0.85] tracking-tighter">
                  Knowledge <br/><span className="text-transparent bg-clip-text bg-none stroke-white" style={{WebkitTextStroke: '1px white'}}>Base</span>
               </h1>
               <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed border-l-4 border-js-yellow pl-6">
                   Curated paths to take you from <span className="text-white font-mono bg-gray-800 px-1 text-sm">console.log</span> to <span className="text-white font-mono bg-gray-800 px-1 text-sm">production</span>.
               </p>
            </div>
         </Section>
      </div>

      <Section className="bg-[#080808] border-b border-gray-800">
        <div className="grid md:grid-cols-3 gap-8">
          {tracks.map((track, idx) => (
            <div key={idx} className="bg-[#050505] border border-gray-800 p-10 flex flex-col hover:border-js-yellow transition-colors group relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 group-hover:bg-js-yellow transition-colors"></div>
              <div className="mb-8">
                <div className="w-12 h-12 bg-[#111] flex items-center justify-center text-white mb-6 group-hover:bg-js-yellow group-hover:text-black transition-colors">
                    <track.icon size={24} />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 uppercase leading-none">{track.title}</h3>
                <div className="text-xs font-bold uppercase tracking-widest text-js-yellow mb-6">/ {track.level}</div>
                <p className="text-gray-400 leading-relaxed font-light">{track.description}</p>
              </div>
              
              <div className="mt-auto">
                <div className="space-y-3 mb-8 border-t border-gray-800 pt-6">
                  {track.topics.map(topic => (
                    <div key={topic} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                      <div className="w-1 h-1 bg-js-yellow"></div>
                      {topic}
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full justify-between group">
                   Start Track <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16}/>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-[#050505]">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
                <Heading level={2}>Index</Heading>
                <span className="text-xs font-mono text-gray-500 uppercase">External Links</span>
            </div>
            <div className="grid gap-px bg-gray-800 border border-gray-800">
              {resources.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-[#111] hover:bg-[#151515] hover:text-white group transition-colors">
                  <div>
                    <div className="font-bold uppercase text-lg mb-1 text-white group-hover:text-js-yellow transition-colors">{res.title}</div>
                    <div className="text-xs font-mono text-gray-500">{res.desc}</div>
                  </div>
                  <ExternalLink size={18} className="text-gray-600 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-12 flex flex-col justify-center border-2 border-white relative">
             <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 font-mono text-xs uppercase font-bold"> Mentorship </div>
             <Heading level={3} className="text-black mb-6">Need Guidance?</Heading>
             <p className="text-gray-800 mb-8 text-lg font-light leading-relaxed">
               Stuck on a problem? Our mentorship program pairs you with senior engineers from top tech companies to review your code and guide your career.
             </p>
             <Button className="w-full bg-black text-white hover:bg-gray-800 border-black justify-center">
                 <Users size={18} className="mr-2"/> Find a Mentor
             </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
