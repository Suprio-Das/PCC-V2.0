import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Event = () => {
  const navigate = useNavigate();

  const targetDate = new Date('2025-10-25T00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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
      <div className="bg-gradient-to-b bg-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <section className="container mx-auto pt-8 pb-28 px-6 md:px-12 text-center">
          {/* Small heading */}
          <p className="text-green-600 text-sm md:text-lg font-garamond mb-4 tracking-wide uppercase">Events</p>

          {/* Main heading */}
          <h1 className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 max-w-3xl mx-auto leading-tight">
            Latest Campaign by the PCIU Computer Club
          </h1>

          {/* Description */}
          <p className="max-w-3xl text-sm md:text-base mx-auto text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
            The most exciting and anticipating event of the year — where the new committee takes charge and the old
            committee bids farewell. Experience cultural programs, music, and inspiring guests!
          </p>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <button className="join-pcc-btn" onClick={() => navigate('/events')}>
              View Event
            </button>
          </div>
        </section>
      </div>

      {/* Countdown Timer Section */}
      <div className="-mt-16 flex flex-wrap justify-center items-center gap-4 md:gap-8 font-garamond text-gray-900 dark:text-white px-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((unit, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/30 dark:bg-gray-800/40 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 p-4 md:p-6 w-20 md:w-52 flex flex-col items-center justify-center animate-[float_3s_ease-in-out_infinite]"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <span className="text-3xl md:text-5xl font-extrabold text-green-600 dark:text-green-400 drop-shadow-md">
              {unit.value.toString().padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm mt-1 text-gray-700 dark:text-gray-300 tracking-wider">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
