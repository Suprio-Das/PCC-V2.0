import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import BlogImg from '../../assets/blog.jpg';

interface Event {
  id: number;
  date: string;
  month: string;
  time: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

export const PastEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const pastEvents: Event[] = [
    {
      id: 1,
      date: '10',
      month: 'Aug',
      time: '10:00 AM',
      title: 'Tech Carnival 2024',
      location: 'PCIU Auditorium',
      description:
        'A grand celebration of innovation, creativity, and teamwork. The Tech Carnival 2024 featured coding contests, robotics, and gaming challenges — a festival of technology for students and professionals alike.',
      image: BlogImg,
    },
    {
      id: 2,
      date: '22',
      month: 'May',
      time: '11:00 AM',
      title: 'PCIU HackFest',
      location: 'Lab 402, CSE Building',
      description:
        'A 36-hour hackathon where students collaborated to build AI-powered and web-based solutions for real-world problems. Mentorship sessions and prizes for top innovations made it a huge success!',
      image: BlogImg,
    },
    {
      id: 3,
      date: '16',
      month: 'Jan',
      time: '12:00 PM',
      title: 'Orientation & Networking Meetup',
      location: 'PCIU Conference Hall',
      description:
        'An event welcoming new members to PCIU Computer Club — with ice-breaking sessions, mentor introductions, and a look at the exciting year ahead. A day full of learning and laughter.',
      image: BlogImg,
    },
  ];

  return (
    <section id="past-events" className="w-[95%] mx-auto mb-24">
      <div className="text-center mt-24 mb-12">
        <p className="text-green-500 font-semibold mb-2 tracking-wider uppercase">— Past Events —</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-3">
          <span className="bg-gradient-to-r from-green-500 to-green-300 bg-clip-text text-transparent">Highlights</span>{' '}
          from Previous Events
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto text-lg">
          Take a look back at our most memorable moments and successful events — a celebration of creativity, tech, and
          community.
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 py-12 rounded-xl">
        <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden border border-green-100 dark:border-green-900 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-green-600 dark:text-green-400">
                  <FaCalendarAlt />
                  <span className="text-sm font-semibold">
                    {event.date} {event.month} • {event.time}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">{event.title}</h3>
                <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-4">
                  <FaMapMarkerAlt /> {event.location}
                </p>
                <button onClick={() => setSelectedEvent(event)} className="join-pcc-btn">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL  */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90%] md:w-[600px] p-6 relative overflow-hidden">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 text-xl hover:text-green-500"
            >
              ✖
            </button>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-3">{selectedEvent.title}</h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-300 mb-4">
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {selectedEvent.date} {selectedEvent.month}
              </span>
              <span className="flex items-center gap-1">
                <FaClock /> {selectedEvent.time}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt /> {selectedEvent.location}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedEvent.description}</p>
            <div className="flex justify-end mt-6">
              <button onClick={() => setSelectedEvent(null)} className="join-pcc-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
