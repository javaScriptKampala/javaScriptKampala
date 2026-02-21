'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Calendar, Zap, CheckCircle, Ticket, MapPin,
  Users, Activity, Code2, Building2, Mic, Handshake,
} from 'lucide-react';
import { Button, Section, Card, Heading, Badge } from '../components/UI';
import { EVENTS, SPONSORS, LEADERS } from '../data';

const JSGame = dynamic(() => import('../components/JSGame'), { ssr: false });

/* ─── Hero ─────────────────────────────────────────────────────────── */
const Hero = () => (
  <div className="relative min-h-[90vh] flex flex-col lg:flex-row border-b border-gray-800 bg-[#0F172A] overflow-hidden">
    <div className="w-full lg:w-1/2 flex items-center p-8 md:p-16 lg:p-24 relative z-10">
      <div className="max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-[0.9] tracking-tighter uppercase">
          JavaScript<br />Kampala
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-4">
          Building Africa&apos;s Strongest JavaScript Community.
        </h2>
        <p className="text-gray-400 font-mono text-lg mb-10">
          Learn. Build. Ship. Grow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/join" icon={Zap} className="w-full sm:w-auto">
            Join Community
          </Button>
          <Button variant="outline" href="/events" icon={Calendar} className="w-full sm:w-auto">
            View Events
          </Button>
        </div>
      </div>
    </div>
    <div className="w-full lg:w-1/2 relative min-h-[400px]">
      <JSGame />
    </div>
  </div>
);

/* ─── MetricsStrip ─────────────────────────────────────────────────── */
const MetricsStrip = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const stats = [
    { target: 1200, label: 'Developers', icon: Users, suffix: '+' },
    { target: 35, label: 'Events Hosted', icon: Calendar, suffix: '+' },
    { target: 15, label: 'Partner Companies', icon: Handshake, suffix: '+' },
    { target: 5, label: 'Years Active', icon: Activity, suffix: '+' },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const durations = [2000, 1800, 1600, 1400];
          stats.forEach((stat, index) => {
            const duration = durations[index];
            const step = stat.target / (duration / 20);
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
              }
              setCounts(prev => {
                const next = [...prev];
                next[index] = Math.floor(current);
                return next;
              });
            }, 20);
          });
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

/* ─── FeaturedEvent ────────────────────────────────────────────────── */
const FeaturedEvent = () => {
  const nextEvent = EVENTS.find((e) => e.status === 'upcoming');
  if (!nextEvent) return null;

  return (
    <Section className="bg-js-black border-b border-gray-800" noPadding>
      <div className="grid lg:grid-cols-2 min-h-150">
        <div className="p-12 lg:p-24 flex flex-col justify-center bg-[#080808]">
          <div className="mb-8 flex items-center gap-3">
            <Badge color="yellow">Upcoming Summit</Badge>
            <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">
              Don&apos;t miss out
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
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Date &amp; Time</div>
                <div className="text-white text-lg font-bold">
                  {new Date(nextEvent.date).toLocaleDateString('en-UG', { timeZone: 'Africa/Kampala' })} — {nextEvent.time}
                </div>
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
            <Button href={nextEvent.ticketsUrl} icon={Ticket} className="w-full sm:w-auto">
              Reserve Seat
            </Button>
            <Button variant="outline" href={`/events/${nextEvent.slug}`} className="w-full sm:w-auto">
              Event Details
            </Button>
          </div>
        </div>

        <div className="relative h-100 lg:h-auto border-t lg:border-t-0 lg:border-l border-gray-800 overflow-hidden group">
          <div className="absolute inset-0 bg-js-yellow opacity-0 group-hover:opacity-10 transition-opacity z-10 mix-blend-overlay" />
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

/* ─── Why JS Kampala ───────────────────────────────────────────────── */
const WHY_BULLETS = [
  'Real skill growth through hands-on workshops',
  'Project collaboration with fellow developers',
  'Hiring connections with top companies',
  'African innovation driving global impact',
  'Open-source contribution and mentorship',
];

const WhyJSKampala = () => (
  <Section className="bg-[#0F172A] border-b border-gray-800">
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <div>
        <div className="w-16 h-1 bg-js-yellow mb-6" />
        <Heading level={2}>More Than Meetups.</Heading>
      </div>
      <ul className="space-y-5">
        {WHY_BULLETS.map((text) => (
          <li key={text} className="flex items-start gap-3 text-gray-300 text-lg">
            <CheckCircle size={22} className="text-js-yellow shrink-0 mt-0.5" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

/* ─── Member Spotlight ─────────────────────────────────────────────── */
const MEMBER_QUOTES: Record<string, string> = {
  'Alex Mukasa': 'JS Kampala changed the trajectory of my career.',
  'Patricia N.': 'The community gave me confidence to speak at international conferences.',
  'David Opio': 'Collaborating here taught me more than any bootcamp ever could.',
};

const MemberSpotlight = () => (
  <Section className="bg-js-black border-b border-gray-800">
    <Heading level={2} className="mb-12">Community Spotlight</Heading>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {LEADERS.map((leader) => (
        <Card key={leader.name} className="p-8 flex flex-col items-center text-center">
          <img
            src={leader.image}
            alt={leader.name}
            className="w-24 h-24 rounded-full object-cover mb-6 border-2 border-js-yellow"
          />
          <h3 className="text-xl font-bold text-white">{leader.name}</h3>
          <p className="text-js-yellow text-sm font-mono uppercase tracking-wider mb-4">{leader.role}</p>
          {MEMBER_QUOTES[leader.name] && (
            <p className="text-gray-400 italic">&ldquo;{MEMBER_QUOTES[leader.name]}&rdquo;</p>
          )}
        </Card>
      ))}
    </div>
  </Section>
);

/* ─── Get Involved ─────────────────────────────────────────────────── */
const INVOLVEMENT = [
  {
    icon: Code2,
    title: 'Developers',
    subtitle: 'Join & Learn',
    description: 'Access workshops, mentorship, and build projects with peers.',
    cta: 'Get Started',
    href: '/join',
  },
  {
    icon: Building2,
    title: 'Companies',
    subtitle: 'Sponsor & Hire Talent',
    description: 'Connect with skilled JavaScript engineers across East Africa.',
    cta: 'Partner With Us',
    href: '/sponsors',
  },
  {
    icon: Mic,
    title: 'Speakers',
    subtitle: 'Teach & Lead Sessions',
    description: 'Share your expertise and grow your personal brand.',
    cta: 'Apply to Speak',
    href: '/events',
  },
];

const GetInvolved = () => (
  <Section className="bg-[#080808] border-b border-gray-800">
    <Heading level={2} className="mb-12">Get Involved</Heading>
    <div className="grid md:grid-cols-3 gap-8">
      {INVOLVEMENT.map((item) => (
        <Card key={item.title} className="p-8 flex flex-col">
          <item.icon size={32} className="text-js-yellow mb-4" />
          <h3 className="text-2xl font-bold text-white uppercase mb-1">{item.title}</h3>
          <p className="text-js-yellow font-mono text-sm uppercase tracking-wider mb-4">{item.subtitle}</p>
          <p className="text-gray-400 mb-8 grow">{item.description}</p>
          <Button href={item.href} className="w-full">
            {item.cta}
          </Button>
        </Card>
      ))}
    </div>
  </Section>
);

/* ─── Partners ─────────────────────────────────────────────────────── */
const Partners = () => (
  <div className="py-24 bg-white border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="text-xs font-black uppercase tracking-[0.3em] mb-12 text-black border-b-2 border-black inline-block pb-3">
        Our Partners
      </div>
      <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
        {SPONSORS.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">
            <img
              src={s.logo}
              alt={s.name}
              className="h-8 md:h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <FeaturedEvent />
      <WhyJSKampala />
      <MemberSpotlight />
      <GetInvolved />
      <Partners />
    </>
  );
}
