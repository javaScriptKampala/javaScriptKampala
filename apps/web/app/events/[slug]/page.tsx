import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, Badge, Button } from '../../../components/UI';
import { fetchEvent } from '../../../lib/data';
import { RichText } from '../../../lib/rich-text';
import { ArrowLeft, Calendar, Clock, MapPin, Ticket, User } from 'lucide-react';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetail({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await fetchEvent(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-js-black">
      {/* Hero */}
      <div className="bg-[#050505] border-b border-gray-800 pt-32 pb-20 relative overflow-hidden">
        {event.coverImage && (
          <div className="absolute inset-0">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover opacity-20 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 to-[#050505]" />
          </div>
        )}
        <Section noPadding>
          <div className="max-w-5xl relative z-10">
            <Link
              href="/events"
              className="inline-flex items-center text-gray-500 hover:text-js-yellow mb-8 text-xs uppercase tracking-widest font-bold border border-gray-800 px-4 py-2 hover:border-js-yellow transition-colors bg-black"
            >
              <ArrowLeft size={16} className="mr-2" /> All Events
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag) => (
                <Badge key={tag} color="gray">{tag}</Badge>
              ))}
              <Badge color={event.status === 'upcoming' ? 'yellow' : 'gray'}>
                {event.status}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-white mb-12 uppercase leading-[0.9] tracking-tighter">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400 font-mono border-t border-gray-800 pt-8">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-js-yellow" />
                <span>
                  {new Date(event.date).toLocaleDateString('en-UG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'Africa/Kampala',
                  })}
                </span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-js-yellow" />
                  <span>{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-js-yellow" />
                <span>{event.venue}{event.city ? `, ${event.city}` : ''}</span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Content Grid */}
      <Section className="max-w-5xl mx-auto py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-black text-white uppercase mb-6 border-l-4 border-js-yellow pl-4">
                About This Event
              </h2>
              {typeof event.description === 'string' ? (
                <p className="text-gray-300 text-lg font-light leading-relaxed">
                  {event.description}
                </p>
              ) : (
                <RichText content={event.description} />
              )}
            </div>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-black text-white uppercase mb-6 border-l-4 border-js-yellow pl-4">
                  Speakers
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, idx) => (
                    <div
                      key={idx}
                      className="bg-[#111] border border-gray-800 p-6 hover:border-js-yellow transition-colors group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        {speaker.avatar ? (
                          <img
                            src={speaker.avatar}
                            alt={speaker.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-gray-800 group-hover:border-js-yellow transition-colors"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center text-js-yellow">
                            <User size={24} />
                          </div>
                        )}
                        <div>
                          <h3 className="text-white font-bold group-hover:text-js-yellow transition-colors">
                            {speaker.name}
                          </h3>
                          {speaker.role && (
                            <p className="text-gray-500 text-xs font-mono uppercase">
                              {speaker.role}
                            </p>
                          )}
                        </div>
                      </div>
                      {speaker.topic && (
                        <p className="text-gray-400 text-sm font-light">
                          <span className="text-js-yellow font-bold text-xs uppercase">Topic:</span>{' '}
                          {speaker.topic}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-black text-white uppercase mb-6 border-l-4 border-js-yellow pl-4">
                  Schedule
                </h2>
                <div className="space-y-0">
                  {event.agenda.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-6 border-b border-gray-800 py-4 hover:bg-[#0a0a0a] transition-colors px-4 -mx-4"
                    >
                      <div className="text-js-yellow font-mono font-bold text-sm w-20 shrink-0 pt-1">
                        {item.time}
                      </div>
                      <div>
                        <div className="text-white font-bold">{item.title}</div>
                        {item.speaker && (
                          <div className="text-gray-500 text-xs font-mono mt-1">
                            {item.speaker}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Registration CTA */}
              {event.ticketsUrl && event.status === 'upcoming' && (
                <div className="p-6 border border-gray-800 bg-[#0a0a0a]">
                  <div className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-b border-gray-800 pb-2">
                    Register
                  </div>
                  <Button href={event.ticketsUrl} icon={Ticket} className="w-full">
                    Get Tickets
                  </Button>
                </div>
              )}

              {/* Event Details */}
              <div className="p-6 border border-gray-800 bg-[#0a0a0a]">
                <div className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-b border-gray-800 pb-2">
                  Event Info
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Date</div>
                    <div className="text-white text-sm font-bold">
                      {new Date(event.date).toLocaleDateString('en-UG', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'Africa/Kampala',
                      })}
                    </div>
                  </div>
                  {event.time && (
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Time</div>
                      <div className="text-white text-sm font-bold">{event.time}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Venue</div>
                    <div className="text-white text-sm font-bold">{event.venue}</div>
                    {event.address && (
                      <div className="text-gray-500 text-xs mt-1">{event.address}</div>
                    )}
                  </div>
                  {event.city && (
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">City</div>
                      <div className="text-white text-sm font-bold">{event.city}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Share */}
              <div className="p-6 border border-gray-800 bg-[#0a0a0a]">
                <div className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-b border-gray-800 pb-2">
                  Share Event
                </div>
                <div className="flex flex-col gap-2">
                  <button className="text-left text-gray-400 hover:text-js-yellow text-sm font-mono uppercase transition-colors">
                    Twitter / X
                  </button>
                  <button className="text-left text-gray-400 hover:text-js-yellow text-sm font-mono uppercase transition-colors">
                    LinkedIn
                  </button>
                  <button className="text-left text-gray-400 hover:text-js-yellow text-sm font-mono uppercase transition-colors">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export const dynamicParams = true;
