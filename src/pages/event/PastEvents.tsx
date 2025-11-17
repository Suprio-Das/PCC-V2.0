import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import api from '@/Services/api';
import DOMPurify from 'dompurify';

interface PastEventType {
  id: string;
  date: number;
  month: string;
  time: string;
  title: string;
  location: string;
  description: string;
  banner: string;
}

export const PastEvents = () => {
  const [pastEvents, setPastEvents] = useState<PastEventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PastEventType | null>(null);

  useEffect(() => {
    const fetchPastEvents = async () => {
      setLoading(true);
      const res = await api.get('/api/public/getevents');

      if (res.data.success) {
        const now = new Date().getTime();

        const completedEvents = res.data.events.filter((event: any) => {
          const eventTime = new Date(event.date + 'T' + event.time).getTime();
          return eventTime < now;
        });

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const formatted = completedEvents.map((event: any) => {
          const eventDate = new Date(event.date);
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

        setPastEvents(formatted);
      }
      setLoading(false);
    };

    fetchPastEvents();
  }, []);

  return (
    <section className="w-[95%] mx-auto mb-24">
      <div className="text-center mt-24 mb-12">
        <p className="text-green-500 mb-2 tracking-wider uppercase">— Past Events —</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
          Highlights from Previous Events
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Take a look back at the most memorable and successful events we organized.
        </p>
      </div>

      <div className="bg-green-50 dark:bg-gray-800 py-10 md:py-12 rounded-xl">
        <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-gray-600 dark:text-gray-300" />
            </div>
          ) : pastEvents.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300 py-12">No past events available.</p>
          ) : (
            pastEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-5 md:p-6 hover:border-l-4 hover:border-green-500 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3 mb-4 md:mb-0 md:pr-6">
                  <p className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400">{event.date}</p>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{event.month}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{event.time}</p>
                  </div>
                </div>

                <div className="hidden md:block w-[1px] bg-gray-300 h-16 mx-6"></div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 flex justify-center md:justify-start items-center gap-2 mt-1">
                    <FaMapMarkerAlt /> {event.location}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="join-pcc-btn px-6 py-2 text-sm md:text-base"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl p-6 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-black"
            >
              ✕
            </button>

            <img
              src={selectedEvent.banner}
              alt={selectedEvent.title}
              className="w-full h-52 md:h-64 object-cover rounded-md mb-4"
            />

            <h3 className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
              {selectedEvent.title}
            </h3>

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

            <p
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(selectedEvent.description),
              }}
            ></p>
          </div>
        </div>
      )}
    </section>
  );
};
