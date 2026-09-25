import React from 'react';
import Link from 'next/link';
import { Section, Heading, Button, Badge } from '../components/UI';
import { SPONSOR_TIERS, SPONSOR_CONTACT_EMAIL } from '../data';
import { Check, ArrowRight, Sparkles, Trophy, Mail } from 'lucide-react';

export default function SponsorsComponent() {
  return (
    <Section className="bg-[#050505] border-t border-gray-800" id="sponsorship-tiers">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Badge color="yellow">Partner With Us</Badge>
        </div>
        <Heading level={2} className="mb-4">
          Sponsorship Tiers
        </Heading>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
          Fuel the developer ecosystem in Uganda. Choose from flexible recurring monthly tiers, per-event sponsorships, or custom in-kind collaborations.
        </p>
        <div className="w-24 h-1 bg-js-yellow mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {SPONSOR_TIERS.map((tier) => {
          const isGold = tier.id === 'gold';
          const isPlatinum = tier.id === 'platinum';

          return (
            <div
              key={tier.id}
              className={`flex flex-col p-6 sm:p-8 border transition-all duration-300 relative ${
                isGold
                  ? 'bg-[#151515] border-js-yellow shadow-[0_0_35px_rgba(247,223,30,0.15)] ring-1 ring-js-yellow/50'
                  : isPlatinum
                  ? 'bg-[#0e0e0e] border-gray-700 hover:border-gray-500 shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                  : 'bg-[#0d0d0d] border-gray-800 hover:border-gray-700'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 right-4">
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 border ${
                      isGold
                        ? 'bg-js-yellow text-black border-js-yellow font-bold'
                        : 'bg-white text-black border-white'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                  / {tier.level}
                </span>
                <span className="text-xl" role="img" aria-label={tier.name}>
                  {tier.emoji}
                </span>
              </div>

              <h3 className="text-xl font-black uppercase mb-2 text-white tracking-tight">
                {tier.name.replace(' Sponsor', '')}
              </h3>

              <div className="mb-4 pb-4 border-b border-gray-800">
                <div className="text-2xl font-black text-js-yellow font-mono">
                  {tier.contributionUGX}
                </div>
                <div className="text-xs font-mono text-gray-400 mt-0.5">
                  {tier.contributionUSD} • {tier.period}
                </div>
              </div>

              <p className="text-xs text-gray-400 font-light mb-6 min-h-10 leading-relaxed">
                {tier.tagline}
              </p>

              <ul className="space-y-3 mb-8 flex-grow border-t border-dashed border-gray-800 pt-6">
                {tier.benefits.slice(0, 5).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <div className="mt-0.5 shrink-0 text-js-yellow">
                      <Check size={13} />
                    </div>
                    <span className="leading-snug">{benefit}</span>
                  </li>
                ))}
                {tier.benefits.length > 5 && (
                  <li className="pt-2 text-[11px] font-mono text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={11} className="text-js-yellow" />
                    + {tier.benefits.length - 5} more exclusive perks
                  </li>
                )}
              </ul>

              <div className="space-y-2 mt-auto">
                <Button
                  className={`w-full text-xs py-3 justify-center ${
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
                  Partner With Us
                </Button>
                <Link
                  href="/sponsors"
                  className="block text-center text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-js-yellow transition-colors py-1"
                >
                  View Tier Details &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 p-6 sm:p-8 bg-[#0a0a0a] border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-mono uppercase tracking-widest text-js-yellow flex items-center justify-center md:justify-start gap-1.5 font-bold">
            <Trophy size={14} /> Per-Event &amp; In-Kind Sponsorships
          </div>
          <h4 className="text-lg font-black uppercase text-white">
            Looking for event-specific branding or in-kind support?
          </h4>
          <p className="text-xs text-gray-400 max-w-2xl">
            Per-event sponsorships start from UGX 250,000 (~$70 USD). We also welcome venue hosting, refreshments, dev software licenses, and speaker partnerships.
          </p>
        </div>
        <div className="shrink-0 flex flex-wrap gap-3">
          <Link
            href="/sponsors"
            className="inline-flex items-center justify-center px-6 py-3 font-bold text-xs uppercase tracking-widest bg-js-yellow text-black hover:bg-white transition-colors"
          >
            Full Sponsorship Guide <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
