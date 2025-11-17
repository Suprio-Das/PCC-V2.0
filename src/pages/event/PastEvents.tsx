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
    <section className="w-[95%] mx-auto mb-24">
      {/* Heading */}
      <div className="text-center mt-24 mb-12">
        <p className="text-green-500 mb-2 tracking-wider uppercase">— Past Events —</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
          Highlights from Previous Events
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
          Take a look back at our most memorable moments and successful events — a celebration of creativity, tech, and
          community.
        </p>
      </div>

      <div className="bg-green-50 dark:bg-gray-800 py-10 md:py-12 rounded-xl">
        <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-6">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-5 md:p-6 hover:border-l-4 hover:border-green-500 transition-all duration-300"
            >
              {/* Date Section */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4 md:mb-0 md:pr-6">
                <p className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 leading-none">
                  {event.date}
                </p>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{event.month}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{event.time}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] bg-gray-300 h-16 mx-6"></div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex justify-center md:justify-start items-center gap-2 mt-1">
                  <FaMapMarkerAlt /> {event.location}
                </p>
              </div>

              {/* Button */}
              <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
                <button onClick={() => setSelectedEvent(event)} className="join-pcc-btn px-6 py-2 text-sm md:text-base">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl p-6 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-black"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-52 md:h-64 object-cover rounded-md mb-4"
            />

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
              {selectedEvent.title}
            </h3>

            {/* Details */}
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

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
