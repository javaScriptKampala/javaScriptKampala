import { Section, Heading, Badge, Button } from '../../components/UI';
import { EVENTS } from '../../data';
import { Calendar, MapPin, Ticket, Clock } from 'lucide-react';

export default function Events() {
  const upcomingEvents = EVENTS.filter(e => e.status === 'upcoming');
  const pastEvents = EVENTS.filter(e => e.status === 'past');

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#050505] border-b border-gray-800 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-js-yellow/5 skew-x-12 transform origin-top-right pointer-events-none"></div>
        <Section noPadding>
          <div className="max-w-4xl">
            <Badge color="yellow" className="mb-6">Schedule</Badge>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-[0.85] tracking-tighter">
              Upcoming <br/>
              <span className="text-transparent bg-clip-text bg-none stroke-white" style={{WebkitTextStroke: '1px white'}}>Events</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed border-l-4 border-js-yellow pl-6">
              Join us for meetups, workshops, and conferences. Build skills, make connections, and grow your network.
            </p>
          </div>
        </Section>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <Section className="bg-[#080808] border-b border-gray-800">
          <Heading level={2} className="mb-12">Upcoming</Heading>
          <div className="grid gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.slug} className="bg-[#111] border border-gray-800 p-8 hover:border-js-yellow transition-colors group">
                <div className="flex flex-col lg:flex-row gap-8">
                  {event.coverImage && (
                    <div className="lg:w-1/3">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map(tag => (
                        <span key={tag} className="border border-gray-700 text-gray-400 text-[10px] px-2 py-1 uppercase font-bold tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase mb-4 group-hover:text-js-yellow transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{event.description}</p>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-js-yellow" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-js-yellow" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-js-yellow" />
                        {event.venue}
                      </div>
                    </div>
                    {event.ticketsUrl && (
                      <Button href={event.ticketsUrl} icon={Ticket}>
                        Get Tickets
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <Section className="bg-[#050505]">
          <Heading level={2} className="mb-12">Past Events</Heading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.slug} className="bg-[#111] border border-gray-800 p-6 opacity-60 hover:opacity-100 transition-opacity">
                {event.coverImage && (
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-32 object-cover grayscale mb-4"
                  />
                )}
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags.map(tag => (
                    <span key={tag} className="border border-gray-700 text-gray-500 text-[10px] px-2 py-1 uppercase font-bold tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-white uppercase mb-2">{event.title}</h3>
                <div className="text-xs text-gray-500 font-mono">
                  {new Date(event.date).toLocaleDateString()} • {event.venue}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <Section className="bg-[#080808]">
          <div className="text-center py-20
      {/* No Events Fallback */}">
            <p className="text-gray-400 text-lg">No events scheduled at this time. Check back soon!</p>
          </div>
        </Section>
      )}
    </>
  );
}
