import React from 'react';
import { Section, Heading, Card, Button, Badge } from '../components/UI';
import { Check, Star, ArrowRight } from 'lucide-react';

export default function SponsorsComponent() {
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
