'use client';

import React, { useState } from 'react';
import { Section, Heading, Badge, Button } from '../../components/UI';
import {
  SPONSORS, SPONSOR_TIERS, PER_EVENT_SPONSORSHIP,
  IN_KIND_SPONSORSHIPS, SPONSOR_CONTACT_EMAIL
} from '../../data';
import {
  Check, Mail, Sparkles, Building2, Coffee, Wrench,
  GraduationCap, Shirt, Radio, Copy, CheckCheck,
  Calendar, Layers, ArrowRight, ShieldCheck
} from 'lucide-react';

export default function SponsorsPage() {
  const [currency, setCurrency] = useState<'UGX' | 'USD'>('UGX');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SPONSOR_CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inKindIcons = [Building2, Coffee, Wrench, GraduationCap, Shirt, Radio];

  return (
    <div className="min-h-screen bg-js-black text-white selection:bg-js-yellow selection:text-black">
      {/* Hero Section */}
      <div className="bg-[#050505] border-b border-gray-800 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-js-yellow/5 skew-x-12 transform origin-top-right pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,223,30,0.06),transparent_50%)] pointer-events-none" />

        <Section noPadding>
          <div className="max-w-5xl">
            <Badge color="yellow" className="mb-6">
              Partnership &amp; Sponsorship
            </Badge>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 uppercase leading-[0.88] tracking-tighter">
              Fuel The <br />
              <span
                className="text-transparent bg-clip-text bg-none stroke-white"
                style={{ WebkitTextStroke: '1px white' }}
              >
                Ecosystem
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 font-light max-w-3xl leading-relaxed border-l-4 border-js-yellow pl-6 mb-10">
              We are excited to offer flexible sponsorship opportunities for individuals and organizations passionate about supporting the JavaScript ecosystem in Uganda. Your contribution helps us host regular meetups, workshops, special events, and provide valuable resources to our growing community of developers.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-800 font-mono text-xs">
              <div className="bg-[#0d0d0d] border border-gray-800 p-4">
                <div className="text-2xl font-black text-js-yellow font-mono">5.7K+</div>
                <div className="text-gray-400 uppercase tracking-widest text-[10px] mt-1">Developers Reached</div>
              </div>
              <div className="bg-[#0d0d0d] border border-gray-800 p-4">
                <div className="text-2xl font-black text-white font-mono">100%</div>
                <div className="text-gray-400 uppercase tracking-widest text-[10px] mt-1">Community Driven</div>
              </div>
              <div className="bg-[#0d0d0d] border border-gray-800 p-4">
                <div className="text-2xl font-black text-js-yellow font-mono">Monthly</div>
                <div className="text-gray-400 uppercase tracking-widest text-[10px] mt-1">Events &amp; Workshops</div>
              </div>
              <div className="bg-[#0d0d0d] border border-gray-800 p-4">
                <div className="text-2xl font-black text-white font-mono">Kampala</div>
                <div className="text-gray-400 uppercase tracking-widest text-[10px] mt-1">Uganda Tech Hub</div>
              </div>
            </div>

            {/* Quick Jump Navigation */}
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-4">
              <a
                href="#monthly-tiers"
                className="text-xs font-mono uppercase tracking-widest border border-gray-800 bg-black/60 px-4 py-2 hover:border-js-yellow hover:text-js-yellow transition-colors"
              >
                Monthly Tiers &darr;
              </a>
              <a
                href="#per-event"
                className="text-xs font-mono uppercase tracking-widest border border-gray-800 bg-black/60 px-4 py-2 hover:border-js-yellow hover:text-js-yellow transition-colors"
              >
                Per-Event &darr;
              </a>
              <a
                href="#in-kind"
                className="text-xs font-mono uppercase tracking-widest border border-gray-800 bg-black/60 px-4 py-2 hover:border-js-yellow hover:text-js-yellow transition-colors"
              >
                In-Kind &darr;
              </a>
              <a
                href="#current-partners"
                className="text-xs font-mono uppercase tracking-widest border border-gray-800 bg-black/60 px-4 py-2 hover:border-js-yellow hover:text-js-yellow transition-colors"
              >
                Current Partners &darr;
              </a>
            </div>
          </div>
        </Section>
      </div>

      {/* Monthly Sponsorship Tiers */}
      <Section className="bg-[#080808] border-b border-gray-800" id="monthly-tiers">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-js-yellow mb-2 font-bold flex items-center gap-1.5">
              <Layers size={14} /> Continuous Partnership
            </div>
            <Heading level={2} className="mb-3">
              Recurring Monthly Sponsorships
            </Heading>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl font-light">
              These tiers are perfect for ongoing partnership and continuous visibility within the community.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 bg-black border border-gray-800 p-1.5 self-start md:self-auto font-mono text-xs">
            <span className="text-gray-500 uppercase tracking-widest px-2 text-[10px]">Currency:</span>
            <button
              type="button"
              onClick={() => setCurrency('UGX')}
              className={`px-3 py-1 uppercase font-bold tracking-wider transition-colors ${
                currency === 'UGX'
                  ? 'bg-js-yellow text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              UGX
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 uppercase font-bold tracking-wider transition-colors ${
                currency === 'USD'
                  ? 'bg-js-yellow text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* 4-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SPONSOR_TIERS.map((tier) => {
            const isGold = tier.id === 'gold';
            const isPlatinum = tier.id === 'platinum';

            return (
              <div
                key={tier.id}
                className={`flex flex-col p-6 sm:p-8 border transition-all duration-300 relative ${
                  isGold
                    ? 'bg-[#141414] border-js-yellow shadow-[0_0_40px_rgba(247,223,30,0.18)] ring-1 ring-js-yellow/60'
                    : isPlatinum
                    ? 'bg-[#0f0f0f] border-gray-600 hover:border-gray-400 shadow-[0_0_35px_rgba(255,255,255,0.06)]'
                    : 'bg-[#0d0d0d] border-gray-800 hover:border-gray-700'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 right-4">
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 border ${
                        isGold
                          ? 'bg-js-yellow text-black border-js-yellow'
                          : 'bg-white text-black border-white'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold">
                    / {tier.level}
                  </span>
                  <span className="text-2xl" role="img" aria-label={tier.name}>
                    {tier.emoji}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase mb-2 text-white tracking-tight">
                  {tier.name.replace(' Sponsor', '')}
                </h3>

                <div className="mb-4 pb-4 border-b border-gray-800">
                  <div className="text-2xl sm:text-3xl font-black text-js-yellow font-mono">
                    {currency === 'UGX' ? tier.contributionUGX : tier.contributionUSD}
                  </div>
                  <div className="text-xs font-mono text-gray-400 mt-1">
                    {currency === 'UGX' ? tier.contributionUSD : tier.contributionUGX} • {tier.period}
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-light mb-6 min-h-10 leading-relaxed">
                  {tier.tagline}
                </p>

                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3 font-bold">
                  Included Benefits:
                </div>

                <ul className="space-y-3 mb-8 flex-grow border-t border-dashed border-gray-800 pt-4">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <div className="mt-0.5 shrink-0 text-js-yellow">
                        <Check size={13} />
                      </div>
                      <span className="leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full text-xs py-3.5 justify-center mt-auto ${
                    isGold
                      ? 'bg-js-yellow text-black border-js-yellow hover:bg-white hover:border-white'
                      : ''
                  }`}
                  variant={isGold ? 'primary' : 'outline'}
                  href={`mailto:${SPONSOR_CONTACT_EMAIL}?subject=${encodeURIComponent(
                    `${tier.name} Inquiry - JavaScript Kampala`
                  )}`}
                  icon={Mail}
                >
                  Join as {tier.name.replace(' Monthly Sponsor', '')}
                </Button>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Per-Event Sponsorship Section */}
      <Section className="bg-[#050505] border-b border-gray-800" id="per-event">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 text-js-yellow text-xs font-mono uppercase tracking-widest font-bold">
            <Calendar size={14} /> Focused High-Impact Presence
          </div>
          <Heading level={2} className="mb-3">
            {PER_EVENT_SPONSORSHIP.title}
          </Heading>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            {PER_EVENT_SPONSORSHIP.description}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#121212] border border-gray-800 px-4 py-2 font-mono text-xs">
            <span className="text-gray-500 uppercase">Contribution:</span>
            <span className="text-js-yellow font-bold">
              {PER_EVENT_SPONSORSHIP.contributionUGX} ({PER_EVENT_SPONSORSHIP.contributionUSD})
            </span>
            <span className="text-gray-400">per event</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Core Benefits */}
          <div className="bg-[#0d0d0d] border border-gray-800 p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-js-yellow mb-2 font-bold">
                Standard Tier
              </div>
              <h3 className="text-xl font-black uppercase text-white mb-4">
                Core Event Champion Benefits
              </h3>
              <ul className="space-y-3.5 mb-8">
                {PER_EVENT_SPONSORSHIP.coreBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <div className="mt-0.5 shrink-0 text-js-yellow">
                      <Check size={14} />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-800 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
              Customizable based on contribution level &amp; event scale.
            </div>
          </div>

          {/* Enhanced Benefits */}
          <div className="bg-[#0f0f0f] border border-js-yellow/40 p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(247,223,30,0.06)]">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-js-yellow mb-2 font-bold">
                Conference &amp; Summit Tier
              </div>
              <h3 className="text-xl font-black uppercase text-white mb-4">
                Enhanced Large-Scale Event Options
              </h3>
              <ul className="space-y-3.5 mb-8">
                {PER_EVENT_SPONSORSHIP.enhancedBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <div className="mt-0.5 shrink-0 text-js-yellow">
                      <Sparkles size={14} />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-800 text-[11px] font-mono text-gray-400">
              We will work with you to tailor a benefits package that aligns with your contribution and marketing goals for the specific event.
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#0a0a0a] border border-gray-800">
          <div className="text-xs sm:text-sm text-gray-300">
            Have an upcoming meetup, tournament, or hackathon in mind?
          </div>
          <Button
            href={`mailto:${SPONSOR_CONTACT_EMAIL}?subject=${encodeURIComponent(
              'Per-Event Sponsorship Inquiry - JavaScript Kampala'
            )}`}
            icon={Mail}
            className="text-xs py-3 w-full sm:w-auto"
          >
            Inquire About Event Sponsorship
          </Button>
        </div>
      </Section>

      {/* In-Kind Sponsorships Section */}
      <Section className="bg-[#080808] border-b border-gray-800" id="in-kind">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 text-js-yellow text-xs font-mono uppercase tracking-widest font-bold">
            <Wrench size={14} /> Non-Monetary Support
          </div>
          <Heading level={2} className="mb-3">
            In-Kind Sponsorships
          </Heading>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            We are also open to discussing in-kind sponsorships. Benefits for in-kind sponsors will be tailored based on the value and nature of the contribution and can be aligned with our monthly and event tiers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IN_KIND_SPONSORSHIPS.map((item, idx) => {
            const Icon = inKindIcons[idx] || Wrench;
            return (
              <div
                key={item.title}
                className="bg-[#0d0d0d] border border-gray-800 p-6 sm:p-7 hover:border-gray-600 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-js-yellow/10 border border-js-yellow/30 flex items-center justify-center text-js-yellow mb-5">
                    <Icon size={22} />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-black uppercase text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:text-left p-6 bg-[#0a0a0a] border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-400">
            Interested in providing venue space, catering, dev tools, or AV equipment?
          </span>
          <Button
            href={`mailto:${SPONSOR_CONTACT_EMAIL}?subject=${encodeURIComponent(
              'In-Kind Sponsorship Proposal - JavaScript Kampala'
            )}`}
            variant="outline"
            className="text-xs py-2.5 w-full sm:w-auto"
            icon={Mail}
          >
            Propose In-Kind Sponsorship
          </Button>
        </div>
      </Section>

      {/* Custom Packages & Contact Us */}
      <Section className="bg-[#050505] border-b border-gray-800" id="contact">
        <div className="border border-gray-800 bg-[#0c0c0c] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-js-yellow/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <Badge color="yellow">Custom Packages</Badge>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Tailored Partnerships For Your Organization
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                We understand that your organization may have unique marketing goals, hiring timelines, or technology roadmaps. We are happy to discuss custom sponsorship packages for both monthly and per-event contributions to meet your specific needs.
              </p>
              <p className="text-xs font-mono text-js-yellow uppercase tracking-widest pt-2">
                We look forward to partnering with you to empower the JavaScript developers of Uganda!
              </p>
            </div>

            <div className="lg:col-span-4 bg-black border border-gray-800 p-6 flex flex-col gap-4 text-center">
              <div className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">
                Official Contact Channel
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-white break-all">
                {SPONSOR_CONTACT_EMAIL}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  href={`mailto:${SPONSOR_CONTACT_EMAIL}?subject=${encodeURIComponent(
                    'Sponsorship Inquiry - JavaScript Kampala'
                  )}`}
                  icon={Mail}
                  className="w-full text-xs py-3 justify-center"
                >
                  Send Email
                </Button>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 border border-gray-800 hover:border-gray-600 bg-[#111] text-gray-300 hover:text-white px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCheck size={14} className="text-js-yellow" /> Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Address
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Current Partners */}
      <Section className="bg-[#080808]" id="current-partners">
        <div className="text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-js-yellow mb-2 font-bold flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} /> Backed By Industry Leaders
          </div>
          <Heading level={2} className="mb-4">
            Current Partners
          </Heading>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            These forward-thinking companies support our meetups, community projects, and developer scholarships.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-gray-800 border border-gray-800">
          {SPONSORS.map((s) => (
            <div
              key={s.id}
              className="p-8 sm:p-10 flex flex-col items-center justify-center text-center bg-[#0e0e0e] hover:bg-[#141414] transition-colors group h-56"
            >
              <img
                src={s.logo}
                alt={s.name}
                className="max-h-12 max-w-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
              <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-js-yellow block mb-1">
                  {s.tier} Sponsor
                </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-white border-b border-white pb-0.5 hover:text-js-yellow hover:border-js-yellow inline-flex items-center gap-1 font-mono uppercase"
                >
                  Visit <ArrowRight size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
