'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Github, Twitter, Linkedin, ArrowUp, MessageCircle, Send } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Community', path: '/about' },
  { name: 'Partners', path: '/sponsors' },
  { name: 'Join', path: '/join', isCta: true },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 w-full z-50 h-20 transition-colors duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group h-full">
          <div className="w-10 h-10 bg-js-yellow flex items-center justify-center text-black font-black text-xl group-hover:bg-white transition-colors">
            JS
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none text-white tracking-tighter uppercase group-hover:text-js-yellow transition-colors">JS KAMPALA</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 h-full">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={
                item.isCta
                  ? `ml-4 px-6 py-2.5 bg-js-yellow text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors border-2 border-js-yellow hover:border-white`
                  : `text-xs font-bold uppercase tracking-widest transition-colors hover:text-js-yellow ${isActive(item.path) ? 'text-js-yellow border-b-2 border-js-yellow py-7' : 'text-gray-400'}`
              }
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 border-l border-gray-700 pl-4">
            <a href="https://github.com/javascriptkampala" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-js-yellow transition-colors"><Github size={18} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-js-yellow transition-colors"><MessageCircle size={18} /></a>
            <a href="https://x.com/JsKampala" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-js-yellow transition-colors"><Twitter size={18} /></a>
          </div>
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 hover:text-js-yellow transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-gray-800 p-0">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block px-8 py-4 text-sm font-bold uppercase tracking-widest border-b border-gray-900 ${
                  item.isCta
                    ? 'bg-js-yellow text-black hover:bg-white'
                    : isActive(item.path)
                    ? 'bg-js-yellow text-black'
                    : 'text-white hover:bg-gray-900 hover:text-js-yellow'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-6 px-8 py-4">
              <a href="https://github.com/javascriptkampala" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-js-yellow transition-colors"><Github size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-js-yellow transition-colors"><MessageCircle size={20} /></a>
              <a href="https://x.com/JsKampala" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-js-yellow transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'auto' });

  return (
    <footer className="bg-black border-t border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-js-yellow flex items-center justify-center text-black font-bold">JS</div>
               <span className="font-black text-xl tracking-tighter text-white uppercase">Kampala</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              A vibrant community of JavaScript developers in Kampala, Uganda. We learn, build, and grow together through meetups, workshops, and open source.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/javascriptkampala" className="text-gray-400 hover:text-js-yellow transition-colors"><Github size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-js-yellow transition-colors"><MessageCircle size={20} /></a>
              <a href="https://x.com/JsKampala" className="text-gray-400 hover:text-js-yellow transition-colors"><Twitter size={20} /></a>
              <a href="https://www.linkedin.com/company/javascript-community-uganda" className="text-gray-400 hover:text-js-yellow transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 border-b border-gray-800 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-500 font-bold uppercase tracking-wider">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="/sponsors" className="hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          <div>
             <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 border-b border-gray-800 pb-2 inline-block">Community</h3>
             <ul className="space-y-4 text-sm text-gray-500 font-bold uppercase tracking-wider">
              <li><Link href="/join" className="hover:text-white transition-colors">Join Us</Link></li>
              <li><a href="https://github.com/javascriptkampala" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="https://x.com/JsKampala" className="hover:text-white transition-colors">X / Twitter</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 border-b border-gray-800 pb-2 inline-block">Newsletter</h3>
             <p className="text-gray-500 text-sm mb-4">Stay updated with our latest events and news.</p>
             <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
               <input
                 type="email"
                 placeholder="you@example.com"
                 className="flex-1 bg-gray-900 border border-gray-700 text-white text-sm px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-js-yellow transition-colors"
               />
               <button type="submit" className="bg-js-yellow text-black px-4 py-2.5 hover:bg-white transition-colors" aria-label="Subscribe">
                 <Send size={16} />
               </button>
             </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-600 text-xs font-mono uppercase">
            <p>© {new Date().getFullYear()} JavaScript Kampala.</p>
            <span className="hidden sm:inline">·</span>
            <p>Built with ❤️ in Kampala.</p>
          </div>
          <button onClick={scrollToTop} className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 hover:text-white transition-colors">
            Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-js-yellow selection:text-black">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
