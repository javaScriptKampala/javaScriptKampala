'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Github, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const DEFAULT_NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Learning', path: '/learning' },
  { name: 'Blog', path: '/blog' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Join', path: '/join', isCta: true },
];

export interface NavItem {
  name: string;
  path: string;
  isCta?: boolean;
}

export interface FooterData {
  socialLinks?: { twitter?: string; github?: string; linkedin?: string };
  nextEventDate?: string;
  copyright?: string;
}

export const Header: React.FC<{ navItems?: NavItem[] }> = ({ navItems }) => {
  const NAV_ITEMS = navItems && navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS;
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-black border-b border-gray-800 h-20">
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
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC<{ footerData?: FooterData }> = ({ footerData }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'auto' });
  const socials = footerData?.socialLinks ?? {
    twitter: 'https://x.com/JsKampala',
    github: 'https://github.com/javascriptkampala',
    linkedin: 'https://www.linkedin.com/company/javascript-community-uganda',
  };
  const nextEvent = footerData?.nextEventDate ?? '07 Feb 2026';
  const copyright = footerData?.copyright ?? `© ${new Date().getFullYear()} JavaScript Kampala.`;

  return (
    <footer className="bg-black border-t border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-js-yellow flex items-center justify-center text-black font-bold">JS</div>
               <span className="font-black text-xl tracking-tighter text-white uppercase">Kampala</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-mono">
              EST. 2018 // KLA, UG
            </p>
            <div className="flex gap-4">
              {socials.twitter && <a href={socials.twitter} className="text-gray-400 hover:text-js-yellow transition-colors"><Twitter size={20} /></a>}
              {socials.github && <a href={socials.github} className="text-gray-400 hover:text-js-yellow transition-colors"><Github size={20} /></a>}
              {socials.linkedin && <a href={socials.linkedin} className="text-gray-400 hover:text-js-yellow transition-colors"><Linkedin size={20} /></a>}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 border-b border-gray-800 pb-2 inline-block">Sitemap</h3>
            <ul className="space-y-4 text-sm text-gray-500 font-bold uppercase tracking-wider">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/join" className="hover:text-white transition-colors">Join</Link></li>
            </ul>
          </div>

          <div>
             <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 border-b border-gray-800 pb-2 inline-block">Content</h3>
             <ul className="space-y-4 text-sm text-gray-500 font-bold uppercase tracking-wider">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/learning" className="hover:text-white transition-colors">Learning</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
             <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 border-b border-gray-800 pb-2 inline-block">System</h3>
             <div className="bg-[#111] border border-gray-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 bg-green-500"></div>
                   <span className="text-xs font-mono text-green-500">OPERATIONAL</span>
                </div>
                <div className="text-[10px] text-gray-500 font-mono uppercase">
                   Next Event: {nextEvent}
                </div>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono uppercase">
            {copyright}
          </p>
          <button onClick={scrollToTop} className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 hover:text-white transition-colors">
            Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export interface LayoutProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  footerData?: FooterData;
}

export const Layout: React.FC<LayoutProps> = ({ children, navItems, footerData }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-js-yellow selection:text-black">
      <Header navItems={navItems} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer footerData={footerData} />
    </div>
  );
};
