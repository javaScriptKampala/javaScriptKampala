import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, Badge, Button } from '../../../components/UI';
import { EVENTS } from '../../../data';
import {
  ArrowLeft, Calendar, Clock, MapPin, Ticket, ShieldAlert,
  Swords, Trophy, Users, ExternalLink, AlertTriangle
} from 'lucide-react';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const isTournament = Boolean(event.rules && event.rules.length > 0);

  return (
    <article className="min-h-screen bg-js-black text-white">
      {/* Hero Banner */}
      <div className="bg-[#060606] border-b border-gray-800 pt-28 sm:pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-js-yellow/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,223,30,0.06),transparent_50%)] pointer-events-none" />

        <Section noPadding>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Link
              href="/events"
              className="inline-flex items-center text-gray-400 hover:text-js-yellow mb-8 text-xs uppercase tracking-widest font-mono font-bold border border-gray-800 px-4 py-2 hover:border-js-yellow transition-colors bg-black/60 backdrop-blur-sm"
            >
              <ArrowLeft size={14} className="mr-2" /> All Events
            </Link>

            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <Badge color="yellow">{event.status === 'upcoming' ? 'Upcoming Event' : 'Past Event'}</Badge>
              {isTournament && (
                <span className="bg-red-500/10 border border-red-500/40 text-red-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 flex items-center gap-1.5">
                  <Swords size={12} /> Live 1v1 Knockout
                </span>
              )}
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-gray-800 text-gray-400 text-[10px] px-2 py-1 uppercase font-mono tracking-widest bg-black/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-[0.95] tracking-tight mb-8">
              {event.title}
            </h1>

            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-3xl mb-10 border-l-2 border-js-yellow pl-5">
              {event.description}
            </p>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-gray-800 pt-8 font-mono">
              <div className="flex items-center gap-3 bg-[#0c0c0c] border border-gray-800/80 p-4">
                <div className="w-10 h-10 bg-js-yellow/10 border border-js-yellow/30 flex items-center justify-center text-js-yellow shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500">Date</div>
                  <div className="text-sm font-bold text-white">
                    {new Date(event.date).toLocaleDateString('en-UG', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      timeZone: 'Africa/Kampala'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#0c0c0c] border border-gray-800/80 p-4">
                <div className="w-10 h-10 bg-js-yellow/10 border border-js-yellow/30 flex items-center justify-center text-js-yellow shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500">Time</div>
                  <div className="text-sm font-bold text-white">{event.time} EAT</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#0c0c0c] border border-gray-800/80 p-4 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 bg-js-yellow/10 border border-js-yellow/30 flex items-center justify-center text-js-yellow shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500">Venue</div>
                  <div className="text-sm font-bold text-white">{event.venue}</div>
                  <div className="text-xs text-gray-400">{event.address}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {event.ticketsUrl && (
              <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
                <Button href={event.ticketsUrl} icon={Ticket} className="text-sm font-black px-8 py-4">
                  Get Free Spectator Pass
                </Button>
                {event.videoUrl && (
                  <a
                    href={event.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-700 bg-black/60 hover:border-js-yellow hover:text-js-yellow text-white px-6 py-4 text-xs font-mono uppercase tracking-widest transition-colors"
                  >
                    Format Demo Video <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )}
          </div>
        </Section>
      </div>

      <Section className="max-w-5xl mx-auto py-16 px-4 sm:px-6">
        <div className="space-y-16">
          {/* Rules & Integrity Policy (Special for Tournament) */}
          {event.rules && event.rules.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert size={22} className="text-js-yellow" />
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  Tournament Rules &amp; Battle Code
                </h2>
              </div>
              <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-8">
                Strict adherence is required for all competitors. Violations lead to immediate disqualification.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {event.rules.map((rule, idx) => (
                  <div
                    key={rule.title}
                    className={`p-6 border ${
                      idx === 1
                        ? 'border-red-500/50 bg-red-950/10 shadow-[0_0_25px_rgba(239,68,68,0.1)]'
                        : 'border-gray-800 bg-[#0c0c0c]'
                    } flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-js-yellow font-bold">
                          Rule #{idx + 1}
                        </span>
                        {rule.highlight && (
                          <span
                            className={`text-[10px] font-mono uppercase font-black px-2 py-0.5 ${
                              idx === 1 ? 'bg-red-500 text-black' : 'bg-js-yellow text-black'
                            }`}
                          >
                            {rule.highlight}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">
                        {rule.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {rule.description}
                      </p>
                    </div>

                    {idx === 1 && (
                      <div className="mt-4 pt-3 border-t border-red-500/30 flex items-center gap-2 text-red-400 text-xs font-mono">
                        <AlertTriangle size={14} /> Zero tolerance: AI tools disabled on all devices.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Knockout Bracket Visualizer */}
          {event.bracket && event.bracket.length > 0 && (
            <div className="border border-gray-800 bg-[#080808] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-800 pb-6">
                <div>
                  <div className="text-[10px] font-mono text-js-yellow uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <Trophy size={14} /> Championship Pathway
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    Knockout Tournament Tree
                  </h2>
                </div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  8 Coders &bull; Single Elimination
                </div>
              </div>

              {/* Bracket Grid */}
              <div className="grid lg:grid-cols-3 gap-6 font-mono text-xs">
                {/* Quarterfinals */}
                <div className="space-y-4">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">
                    Quarterfinals (10m Sprint)
                  </div>
                  {event.bracket.slice(0, 4).map((m) => (
                    <div key={m.id} className="border border-gray-800 bg-[#111] p-3 hover:border-js-yellow transition-colors">
                      <div className="text-[10px] text-gray-500 uppercase mb-2">{m.round}</div>
                      <div className="flex items-center justify-between py-1 border-b border-gray-800/60">
                        <span className="text-white font-bold">{m.player1}</span>
                        <span className="text-[10px] text-gray-500">TBD</span>
                      </div>
                      <div className="flex items-center justify-between py-1 pt-1.5">
                        <span className="text-white font-bold">{m.player2}</span>
                        <span className="text-[10px] text-gray-500">TBD</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Semifinals */}
                <div className="space-y-4 lg:pt-8">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">
                    Semifinals (15m Deep Dive)
                  </div>
                  {event.bracket.slice(4, 6).map((m) => (
                    <div key={m.id} className="border border-gray-800 bg-[#111] p-4 lg:my-8 hover:border-js-yellow transition-colors">
                      <div className="text-[10px] text-gray-500 uppercase mb-2">{m.round}</div>
                      <div className="flex items-center justify-between py-1.5 border-b border-gray-800/60">
                        <span className="text-white font-bold">{m.player1}</span>
                        <span className="text-[10px] text-gray-500">TBD</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 pt-2">
                        <span className="text-white font-bold">{m.player2}</span>
                        <span className="text-[10px] text-gray-500">TBD</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grand Final */}
                <div className="space-y-4 lg:pt-16">
                  <div className="text-[11px] font-bold text-js-yellow uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-1.5">
                    <Trophy size={14} /> Grand Final (20m Duel)
                  </div>
                  {event.bracket.slice(6, 7).map((m) => (
                    <div key={m.id} className="border-2 border-js-yellow bg-js-yellow/5 p-5 shadow-[0_0_30px_rgba(247,223,30,0.1)]">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-js-yellow mb-3">
                        Championship Match
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-white font-black text-sm">{m.player1}</span>
                        <span className="text-xs text-js-yellow font-bold">FINALIST 1</span>
                      </div>
                      <div className="flex items-center justify-between py-2 pt-3">
                        <span className="text-white font-black text-sm">{m.player2}</span>
                        <span className="text-xs text-js-yellow font-bold">FINALIST 2</span>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-800 text-center text-[10px] text-gray-400 uppercase tracking-widest">
                        Winner receives the JSK Code Wars Edition 2 Trophy
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Agenda Timeline */}
          {event.agenda && event.agenda.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock size={22} className="text-js-yellow" />
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  Battle Schedule (2:00 PM – 5:00 PM)
                </h2>
              </div>

              <div className="border border-gray-800 divide-y divide-gray-800 bg-[#090909]">
                {event.agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#111] transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="font-mono text-xs font-bold text-js-yellow bg-js-yellow/10 border border-js-yellow/30 px-3 py-1.5 shrink-0">
                        {item.time}
                      </div>
                      <div className="text-base font-bold text-white uppercase tracking-tight">
                        {item.title}
                      </div>
                    </div>
                    {item.speaker && (
                      <div className="text-xs font-mono text-gray-400 sm:text-right shrink-0">
                        {item.speaker}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Venue & Host Section */}
          <div className="border border-gray-800 bg-[#090909] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="space-y-4 max-w-xl">
                <div className="text-[10px] font-mono text-js-yellow uppercase tracking-widest">
                  Host &amp; Venue Partner
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                  Africa&apos;s Talking Uganda Office
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Join us in-person at Africa&apos;s Talking Office. Experience the intense action with live high-definition code screens, live audio commentary, and direct networking with Uganda&apos;s top software engineers and architects.
                </p>
                <div className="font-mono text-xs text-gray-300 space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-js-yellow shrink-0" />
                    <span>{event.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-js-yellow shrink-0" />
                    <span>In-person spectator seating limited to registered attendees.</span>
                  </div>
                </div>
              </div>

              {event.ticketsUrl && (
                <div className="w-full lg:w-auto shrink-0 bg-black border border-gray-800 p-6 flex flex-col gap-4 text-center">
                  <div className="text-xs font-mono uppercase text-gray-400 tracking-widest">
                    Admission
                  </div>
                  <div className="text-2xl font-black text-js-yellow uppercase">
                    Free RSVP
                  </div>
                  <p className="text-[11px] text-gray-500 font-mono max-w-xs">
                    Tickets managed through TicketDaddy. Secure your seat before room capacity is reached.
                  </p>
                  <Button href={event.ticketsUrl} icon={Ticket} className="w-full justify-center">
                    Reserve on TicketDaddy
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </article>
  );
}

export function generateStaticParams() {
  return EVENTS.map((event) => ({
    slug: event.slug,
  }));
}
