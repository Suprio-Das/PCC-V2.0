import { RootState } from '@/Redux/Store';
import api from '@/Services/api';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import { Loader2 } from 'lucide-react';

interface UpcomingEvent {
  id: number;
  date: string;
  month: string;
  time: string;
  title: string;
  location: string;
  description: string;
  banner: string;
}

interface UserType {
  userId: string;
}

export const UpcomingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);

  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.Auth.user) as UserType | null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await api.get('/api/public/getevents');
      if (res.data.success) {
        const events = res.data.events.map((event: any) => {
          const eventDate = new Date(event.date);
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return {
            id: event._id,
            title: event.title,
            banner: event.banner,
            date: eventDate.getDate(),
            month: monthNames[eventDate.getMonth()],
            time: event.time,
            location: event.location,
            description: event.description,
          };
        });
        setUpcomingEvents(events);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="upcoming-events" className="w-[95%] mx-auto mb-24">
      {/* Heading */}
      <div className="text-center mt-16 mb-10">
        <p className="text-green-500 uppercase tracking-wide mb-2 text-sm md:text-base">— Upcoming Events —</p>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">Exciting Events Coming Soon</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto text-sm md:text-base">
          Mark your calendars and get ready for our upcoming adventures in technology!
        </p>
      </div>

      {/* Event Cards */}
      {/* Event Cards */}
      <div className="bg-green-50 dark:bg-gray-800 py-10 md:py-12 rounded-xl">
        <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-gray-600 dark:text-gray-300" />
            </div>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">No upcoming events.</p>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-5 md:p-6 hover:border-l-4 hover:border-green-500 transition-all duration-300"
              >
                {/* Date */}
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4 md:mb-0 md:pr-6">
                  <p className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 leading-none">
                    {event.date}
                  </p>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{event.month}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{event.time}</p>
                  </div>
                </div>

                <div className="hidden md:block w-[1px] bg-gray-300 h-16 mx-6"></div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex justify-center md:justify-start items-center gap-2 mt-1">
                    <FaMapMarkerAlt /> {event.location}
                  </p>
                </div>

                {/* Read More Button */}
                <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
                  <button onClick={() => setSelectedEvent(event)} className="join-pcc-btn px-6 py-2">
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl p-6 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedEvent.banner}
              alt={selectedEvent.title}
              className="w-full h-52 md:h-64 object-cover rounded-md mb-4"
            />

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
              {selectedEvent.title}
            </h3>

            {/* Event Info */}
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

            <p
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(selectedEvent.description),
              }}
            ></p>

            {/* Register Button */}
            <div className="flex justify-end mt-6">
              <button
                disabled={!userId}
                className={`join-pcc-btn px-6 py-2 text-sm md:text-base ${
                  !userId ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {userId ? 'Register Now' : 'Login Required'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
