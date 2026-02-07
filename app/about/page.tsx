import React from 'react';
import { Section, Heading, Card, Button, Badge } from '../../components/UI';
import { LEADERS } from '../../data';
import { Users, Code, Heart, Shield, Terminal, Globe, Cpu } from 'lucide-react';

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#050505] border-b border-gray-800 pt-32 pb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-js-yellow/5 skew-x-12 transform origin-top-right pointer-events-none"></div>
         <Section noPadding>
            <div className="max-w-4xl">
               <Badge color="yellow" className="mb-6">About Us</Badge>
               <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-[0.85] tracking-tighter">
                  The Engine of <br/><span className="text-transparent bg-clip-text bg-none stroke-white" style={{WebkitTextStroke: '1px white'}}>Innovation</span>
               </h1>
               <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed border-l-4 border-js-yellow pl-6">
                  JavaScript Kampala is not just a meetup. It is a movement. We are architecting the digital future of Uganda, one commit at a time.
               </p>
            </div>
         </Section>
      </div>

      {/* Mission & Values */}
      <Section className="bg-[#080808] border-b border-gray-800" noPadding>
        <div className="grid md:grid-cols-2">
           <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-center">
              <Heading level={2} className="mb-8">Our Mission</Heading>
              <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                 <p>
                    To build a world-class engineering ecosystem in Kampala that rivals any global tech hub.
                 </p>
                 <p>
                    We believe in the power of open source, radical collaboration, and continuous mentorship. Whether you are shipping production code at a unicorn or just wrote your first function, you have a place here.
                 </p>
              </div>
           </div>
           
           <div className="grid grid-cols-2">
              {[
                { icon: Code, title: 'Technical Excellence', desc: 'Best practices only.' },
                { icon: Users, title: 'Radical Inclusion', desc: 'Everyone is welcome.' },
                { icon: Heart, title: 'Give Back', desc: 'Open source first.' },
                { icon: Globe, title: 'Global Mindset', desc: 'Local roots, global impact.' }
              ].map((item, i) => (
                <div key={i} className="p-8 border-b border-r border-gray-800 hover:bg-[#111] transition-colors group flex flex-col justify-center">
                   <item.icon className="mb-4 text-gray-600 group-hover:text-js-yellow transition-colors" size={32} />
                   <h3 className="font-bold text-white uppercase tracking-wider mb-2">{item.title}</h3>
                   <p className="text-xs text-gray-500 font-mono uppercase">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section className="bg-[#050505] border-b border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
           <Heading level={2}>Core Team</Heading>
           <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-4 md:mt-0">/ OPERATORS</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {LEADERS.map((leader, i) => (
            <div key={i} className="group">
               <div className="aspect-square w-full relative flex items-center justify-center p-8">
                  <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-js-yellow transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(247,223,30,0.4)]">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-js-yellow flex items-center justify-center text-black font-bold group-hover:scale-110 transition-transform duration-300">
                    <Terminal size={20} />
                  </div>
               </div>
               <div className="p-6">
                 <h3 className="text-xl font-black text-white uppercase mb-1 group-hover:text-js-yellow transition-colors duration-300">{leader.name}</h3>
                 <p className="text-js-yellow text-xs font-bold uppercase tracking-widest">{leader.role}</p>
               </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Code of Conduct */}
      <Section id="coc" className="bg-[#111]">
        <div className="max-w-4xl mx-auto">
           <div className="border border-gray-700 bg-black p-1">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-[#151515]">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <div className="ml-4 text-xs font-mono text-gray-500">coc.md — Read Only</div>
              </div>
              <div className="p-8 md:p-12 font-mono">
                 <h2 className="text-js-yellow text-xl md:text-2xl font-bold mb-6 uppercase">&gt; SYSTEM_POLICY: Code of Conduct</h2>
                 <p className="text-gray-300 mb-6 leading-relaxed">
                   We are dedicated to providing a harassment-free experience for everyone. We do not tolerate harassment of community members in any form.
                 </p>
                 <p className="text-gray-300 mb-8 leading-relaxed">
                   Sexual language and imagery is not appropriate for any community event, including talks, workshops, parties, Twitter and other online media.
                 </p>
                 <Button variant="outline" href="https://github.com/kampala-js/coc" className="w-full md:w-auto">
                    View Full Policy
                 </Button>
              </div>
           </div>
        </div>
      </Section>
    </>
  );
}
