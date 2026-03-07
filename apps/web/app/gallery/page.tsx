'use client';

import React, { useState } from 'react';
import { Section, Heading, Badge } from '../../components/UI';
import { GALLERY } from '../../data';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY.length) % GALLERY.length);
    }
  };

  return (
    <>
      <div className="bg-[#050505] border-b border-gray-800 pt-32 pb-20">
         <Section noPadding>
            <div className="max-w-4xl">
               <Badge color="yellow" className="mb-6">Archive</Badge>
               <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-[0.85] tracking-tighter">
                  Community <br/><span className="text-transparent bg-clip-text bg-none stroke-white" style={{WebkitTextStroke: '1px white'}}>Moments</span>
               </h1>
            </div>
         </Section>
      </div>

      <div className="bg-[#080808]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-gray-800">
          {GALLERY.map((item, idx) => (
            <div 
              key={item.id} 
              className="aspect-square relative group cursor-pointer border-r border-b border-gray-800 overflow-hidden"
              onClick={() => openLightbox(idx)}
            >
              <img src={item.src} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              
              <div className="absolute inset-0 bg-js-yellow/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                 <Camera size={32} className="text-black mb-4" />
                 <p className="text-black font-black uppercase tracking-wider text-sm border-b-2 border-black pb-1 mb-2">Expand View</p>
                 <p className="text-black font-mono text-xs opacity-75">{item.caption}</p>
              </div>
            </div>
          ))}
          
          {/* Submit Tile */}
          <div className="aspect-square border-r border-b border-gray-800 bg-[#111] flex flex-col items-center justify-center p-8 text-center hover:bg-[#1a1a1a] transition-colors group">
              <Camera size={48} className="text-gray-700 mb-6 group-hover:text-js-yellow transition-colors" />
              <h3 className="text-white font-bold uppercase mb-2">Add Your Photos</h3>
              <p className="text-gray-500 text-xs font-mono mb-6">Were you at our last event?</p>
              <a href="mailto:photos@kampala.js.org" className="px-6 py-3 border border-gray-600 text-white font-bold uppercase text-xs hover:border-js-yellow hover:text-js-yellow transition-colors">Submit Photos</a>
          </div>
        </div>
      </div>

      {/* Lightbox - Metro Style */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-0 right-0 w-20 h-20 flex items-center justify-center bg-transparent hover:bg-js-yellow text-white hover:text-black transition-colors z-50 border-l border-b border-white/10">
            <X size={32} />
          </button>
          
          <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-32 flex items-center justify-center bg-transparent hover:bg-white/10 text-white transition-colors hidden md:flex border-r border-y border-white/10">
            <ChevronLeft size={48} />
          </button>

          <div className="max-w-7xl max-h-screen p-4 md:p-12 relative flex flex-col items-center">
            <div className="border border-gray-800 bg-[#050505] p-2">
                <img 
                src={GALLERY[selectedImageIndex].src} 
                alt={GALLERY[selectedImageIndex].caption} 
                className="max-h-[75vh] w-auto max-w-full" 
                />
            </div>
            <div className="mt-6 flex items-center gap-4">
                <span className="text-js-yellow font-mono text-xs">IMAGE {selectedImageIndex + 1} / {GALLERY.length}</span>
                <div className="w-12 h-px bg-gray-700"></div>
                <p className="text-white font-bold uppercase tracking-widest text-sm">{GALLERY[selectedImageIndex].caption}</p>
            </div>
          </div>

          <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-32 flex items-center justify-center bg-transparent hover:bg-white/10 text-white transition-colors hidden md:flex border-l border-y border-white/10">
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  );
}
