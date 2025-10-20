import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import BlogImg from '../../assets/blog.jpg';

interface UpcomingEvent {
  id: number;
  date: string;
  month: string;
  time: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

export const UpcomingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: 1,
      date: '25',
      month: 'Dec',
      time: '6:00 PM',
      title: 'Winter Tech Meetup 2025',
      location: 'PCIU Main Auditorium',
      description:
        'Join us for an evening of inspiring tech talks, innovation showcases, and fun networking opportunities as we wrap up the year with PCIU’s biggest meetup of the season.',
      image: BlogImg,
    },
    {
      id: 2,
      date: '10',
      month: 'Feb',
      time: '9:00 AM',
      title: 'CodeStorm 2026',
      location: 'Lab 301, CSE Department',
      description:
        'Get ready to challenge your coding skills in CodeStorm 2026 — PCIU’s largest programming contest. Compete, learn, and grow as you solve real-world problems under pressure!',
      image: BlogImg,
    },
    {
      id: 3,
      date: '5',
      month: 'Apr',
      time: '11:00 AM',
      title: 'AI & Robotics Expo 2026',
      location: 'PCIU Expo Hall',
      description:
        'Witness the future of AI, robotics, and automation at PCIU’s biggest tech showcase. Experience live demos, keynote sessions, and student innovations firsthand!',
      image: BlogImg,
    },
  ];

  return (
    <section id="upcoming-events" className="w-[95%] mx-auto mb-24">
      <div className="text-center mt-24 mb-8">
        <p className="text-green-500 font-semibold mb-2">— Upcoming Events —</p>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">Exciting Events Coming Soon</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto">
          Mark your calendars and get ready for our upcoming adventures in technology and creativity!
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 py-12 rounded-xl">
        <div className="w-[90%] mx-auto space-y-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 hover:border-l-4 hover:border-green-500 transition-all"
            >
              <div className="flex items-center gap-3 pr-6">
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">{event.date}</p>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{event.month}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{event.time}</p>
                </div>
              </div>
              <div className="w-[1px] bg-gray-300 h-16 mx-6"></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <FaMapMarkerAlt /> {event.location}
                </p>
              </div>
              <button onClick={() => setSelectedEvent(event)} className="join-pcc-btn">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90%] md:w-[600px] p-6 relative">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-3">{selectedEvent.title}</h3>
            <p className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-300 mb-4">
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {selectedEvent.date} {selectedEvent.month}
              </span>
              <span className="flex items-center gap-1">
                <FaClock /> {selectedEvent.time}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt /> {selectedEvent.location}
              </span>
            </p>
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
