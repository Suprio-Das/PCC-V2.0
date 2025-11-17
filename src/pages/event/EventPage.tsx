import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { UpcomingEvents } from './UpcomingEvents';
import { PastEvents } from './PastEvents';
import JoinEvent from './JoinEvent';
import { FaMapMarkerAlt } from 'react-icons/fa';
import api from '@/Services/api';

export const EventPage = () => {
  const [targetDate, setTargetDate] = useState<number | null>(null);
  const [eventTitle, setEventTitle] = useState<string>('Loading...');
  const [eventLocation, setEventLocation] = useState<string>('PCIU Campus, Chattogram');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch earliest event from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/public/getevents');

        if (response.data.success) {
          const events = response.data.events;

          // Filter valid upcoming events
          const validEvents = events.filter((ev: any) => {
            const d = new Date(ev.date);
            return !isNaN(d.getTime());
          });

          validEvents.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

          if (validEvents.length > 0) {
            const earliest = validEvents[0];
            setTargetDate(new Date(earliest.date + 'T' + earliest.time).getTime());
            setEventTitle(earliest.title);
            setEventLocation(earliest.location);
          } else {
            setEventTitle('No Upcoming Events');
          }
        }
      } catch (err) {
        setEventTitle('Error loading events');
      }
    };

    fetchEvents();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900">
        <section
          className="relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center"
          style={{
            backgroundImage: "url('src/assets/event-bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-600/70 via-gray-700/70 to-gray-900/70"></div>

          <div className="relative z-10 px-4">
            <p className="flex justify-center items-center gap-2 text-white text-sm px-4 py-2 rounded-full mb-4 backdrop-blur-md">
              <FaMapMarkerAlt className="text-green-400" />
              {eventLocation}
            </p>

            <h1 className="text-white font-bold text-3xl md:text-5xl mb-4">{eventTitle}</h1>

            <p className="text-white/80 max-w-lg mx-auto mb-6">
              Celebrate innovation, culture, and technology in one grand event — featuring speakers, music, and
              interactive sessions!
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="absolute -bottom-16 flex flex-wrap justify-center items-center gap-4 md:gap-8 font-garamond text-gray-900 dark:text-white px-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, index) => (
              <div
                key={index}
                className="backdrop-blur-2xl bg-white dark:bg-gray-800/40 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 p-4 md:p-6 w-20 md:w-52 flex flex-col items-center justify-center animate-[float_3s_ease-in-out_infinite]"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="text-3xl md:text-5xl font-extrabold text-green-500 drop-shadow-md">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-xs md:text-sm mt-1 text-gray-800">{unit.label}</span>
              </div>
            ))}
          </div>
        </section>

        <JoinEvent />
        <UpcomingEvents />
        <PastEvents />
      </div>
      <Footer />
    </>
  );
};
