import React from 'react';
import { Section, Heading, Card, Button, Badge } from '../../components/UI';
import { SPONSORS } from '../../data';
import { Check, Star, ArrowRight } from 'lucide-react';

export default function Sponsors() {
  const tiers = [
    { 
        name: 'Bronze', 
        price: 'Contact Us', 
        desc: 'Entry level support',
        features: ['Logo on website', 'Thank you tweet', 'Discord role'] 
    },
    { 
        name: 'Silver', 
        price: 'Contact Us', 
        desc: 'Brand visibility',
        features: ['Logo on website', 'Social media shoutouts', 'Swag distribution', 'Job board posting'] 
    },
    { 
        name: 'Gold', 
        price: 'Contact Us', 
        desc: 'Strategic Partner',
        features: ['Logo on print materials', '5 min speaking slot', 'Booth at venue', 'Dedicated email blast', 'Recruiting access'] 
    },
  ];

  return (
    <>
      <div className="bg-[#050505] border-b border-gray-800 pt-32 pb-20">
         <Section noPadding>
            <div className="max-w-4xl">
               <Badge color="yellow" className="mb-6">Partnership</Badge>
               <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-[0.85] tracking-tighter">
                  Fuel The <br/><span className="text-transparent bg-clip-text bg-none stroke-white" style={{WebkitTextStroke: '1px white'}}>Ecosystem</span>
               </h1>
               <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                  We are non-profit. Our sponsors make meetups, workshops, and open source projects possible. Join top tech companies in supporting the next generation.
               </p>
            </div>
         </Section>
      </div>

      <Section className="bg-[#080808] border-b border-gray-800">
        <Heading level={2} className="mb-12">Current Partners</Heading>
        <div className="grid md:grid-cols-4 gap-px bg-gray-800 border border-gray-800">
           {SPONSORS.map((s) => (
             <div key={s.id} className="p-12 flex flex-col items-center justify-center text-center bg-[#111] hover:bg-[#151515] transition-colors group h-64">
                <img src={s.logo} alt={s.name} className="max-h-16 max-w-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-js-yellow block mb-2">{s.tier} Sponsor</span>
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-white border-b border-white pb-1 hover:text-gray-300">Visit Profile</a>
                </div>
             </div>
           ))}
        </div>
      </Section>

      <Section className="bg-[#050505]">
         <div className="text-center mb-16">
             <Heading level={2} className="mb-4">Sponsorship Tiers</Heading>
             <div className="w-24 h-1 bg-js-yellow mx-auto"></div>
         </div>
         
         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {tiers.map((tier, idx) => (
               <div key={tier.name} className={`flex flex-col p-10 border transition-colors ${tier.name === 'Gold' ? 'bg-white border-white' : 'bg-[#111] border-gray-800 hover:border-gray-600'}`}>
                  <div className={`text-xs font-mono mb-4 uppercase tracking-widest ${tier.name === 'Gold' ? 'text-black' : 'text-gray-500'}`}>/ LEVEL_0{idx + 1}</div>
                  <h3 className={`text-4xl font-black uppercase mb-2 ${tier.name === 'Gold' ? 'text-black' : 'text-white'}`}>{tier.name}</h3>
                  <p className={`text-sm mb-8 font-mono uppercase ${tier.name === 'Gold' ? 'text-gray-600' : 'text-gray-500'}`}>{tier.desc}</p>
                  
                  <ul className="space-y-4 mb-10 flex-grow border-t border-dashed pt-8 ${tier.name === 'Gold' ? 'border-gray-300' : 'border-gray-800'}">
                    {tier.features.map(f => (
                       <li key={f} className="flex items-start gap-3 text-sm">
                         <div className="mt-1"><Check size={14} className={tier.name === 'Gold' ? 'text-black' : 'text-js-yellow'} /></div>
                         <span className={`uppercase tracking-wide text-xs font-bold ${tier.name === 'Gold' ? 'text-black' : 'text-gray-300'}`}>{f}</span>
                       </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.name === 'Gold' ? 'bg-black text-white hover:bg-gray-800 border-black' : ''}`} 
                    variant={tier.name === 'Gold' ? 'primary' : 'outline'}
                    href="mailto:sponsor@kampala.js.org"
                  >
                    Partner with us
                  </Button>
               </div>
            ))}
         </div>
      </Section>
      
    </>
  );
}
