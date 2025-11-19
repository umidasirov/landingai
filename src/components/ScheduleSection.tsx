import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react@0.487.0';

export function ScheduleSection() {
  const schedule = [
    {
      day: 'Day 1',
      date: 'June 15, 2025',
      sessions: [
        {
          time: '09:00 - 10:00',
          title: 'Opening Keynote: The AI Revolution',
          speaker: 'Dr. Sarah Chen',
          location: 'Main Hall',
          attendees: '500+',
        },
        {
          time: '10:30 - 12:00',
          title: 'Deep Learning Architectures',
          speaker: 'Prof. Michael Rodriguez',
          location: 'Hall A',
          attendees: '200+',
        },
        {
          time: '14:00 - 15:30',
          title: 'Neural Networks in Practice',
          speaker: 'Elena Volkov',
          location: 'Hall B',
          attendees: '250+',
        },
        {
          time: '16:00 - 17:30',
          title: 'AI Ethics & Governance',
          speaker: 'Aisha Mohammed',
          location: 'Main Hall',
          attendees: '300+',
        },
      ],
    },
    {
      day: 'Day 2',
      date: 'June 16, 2025',
      sessions: [
        {
          time: '09:00 - 10:30',
          title: 'Computer Vision Breakthroughs',
          speaker: 'Dr. Thomas Wright',
          location: 'Main Hall',
          attendees: '400+',
        },
        {
          time: '11:00 - 12:30',
          title: 'Natural Language Processing',
          speaker: 'Maria Garcia',
          location: 'Hall A',
          attendees: '280+',
        },
        {
          time: '14:00 - 15:30',
          title: 'AI in Robotics',
          speaker: 'Dr. Kenji Tanaka',
          location: 'Hall B',
          attendees: '220+',
        },
        {
          time: '16:00 - 18:00',
          title: 'Workshop: Building AI Systems',
          speaker: 'Multiple Speakers',
          location: 'Workshop Room',
          attendees: '150+',
        },
      ],
    },
    {
      day: 'Day 3',
      date: 'June 17, 2025',
      sessions: [
        {
          time: '09:00 - 10:30',
          title: 'AI for Healthcare',
          speaker: 'Dr. James Park',
          location: 'Main Hall',
          attendees: '350+',
        },
        {
          time: '11:00 - 12:30',
          title: 'Future of AGI',
          speaker: 'Panel Discussion',
          location: 'Main Hall',
          attendees: '500+',
        },
        {
          time: '14:00 - 15:30',
          title: 'Startup Pitches',
          speaker: 'AI Startups',
          location: 'Innovation Hall',
          attendees: '200+',
        },
        {
          time: '16:00 - 17:00',
          title: 'Closing Ceremony',
          speaker: 'All Speakers',
          location: 'Main Hall',
          attendees: '500+',
        },
      ],
    },
  ];

  return (
    <section id="schedule" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6"
          >
            Event Schedule
          </motion.div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
            Three Days of{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Innovation
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Packed with insights, workshops, and networking opportunities
          </p>
        </motion.div>

        {/* Schedule Timeline */}
        <div className="space-y-16">
          {schedule.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: dayIndex * 0.1 }}
            >
              {/* Day Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
                    <Calendar className="text-white" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl text-white">{day.day}</h3>
                  <p className="text-purple-400">{day.date}</p>
                </div>
                <div className="flex-grow h-px bg-gradient-to-r from-purple-500/50 to-transparent ml-4" />
              </div>

              {/* Sessions */}
              <div className="space-y-4 ml-8 border-l-2 border-purple-500/30 pl-8">
                {day.sessions.map((session, sessionIndex) => (
                  <motion.div
                    key={sessionIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sessionIndex * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="relative group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[37px] top-6 w-3 h-3 bg-purple-600 rounded-full border-2 border-black group-hover:bg-cyan-400 transition-colors" />
                    
                    {/* Session Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm group-hover:border-purple-500/60 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2 text-cyan-400">
                              <Clock size={16} />
                              <span className="text-sm">{session.time}</span>
                            </div>
                          </div>
                          <h4 className="text-white text-xl mb-2">{session.title}</h4>
                          <p className="text-purple-400 mb-3">{session.speaker}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} />
                              {session.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={14} />
                              {session.attendees}
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-purple-600/20 border border-purple-500/50 rounded-full text-purple-400 hover:bg-purple-600 hover:text-white transition-all whitespace-nowrap"
                        >
                          Add to Calendar
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
