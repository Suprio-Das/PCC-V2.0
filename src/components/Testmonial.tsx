import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import Monoara from '@/assets/manoara.png';
import Safa from '@/assets/shafayet.png';
import Miraj from '@/assets/miraz.png';
import Pranta from '@/assets/pranto.png';

export const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Manoara Begum',
      avatar: Monoara,
      role: 'President',
      feedback: 'Joining this committee has been a life-changing experience.',
      rating: 5,
    },
    {
      name: 'Mr. Shafayet Nur',
      avatar: Safa,
      role: 'General Secretary',
      feedback: 'This committee helped me sharpen my skills and meet some of the best.',
      rating: 5,
    },
    {
      name: 'Md. Mahfuzur Rahman Miraz',
      avatar: Miraj,
      role: 'Joint-General Secretary',
      feedback: 'Being a part of this team has pushed me beyond my limits and helped.',
      rating: 5,
    },

    {
      name: 'Pranta Paul',
      avatar: Pranta,
      role: 'Organizational Secretary',
      feedback: "I've met incredible people and have learned so much through our projects.",
      rating: 5,
    },
  ];

  const [currIndex, setCurrIndex] = useState(0);
  const scrollEl = useRef<HTMLDivElement | null>(null);
  const autoRef = useRef<number | null>(null);

  useEffect(() => {
    const cardWidth = window.innerWidth < 640 ? 280 : 450;
    const gap = 16;

    if (scrollEl.current) {
      const containerWidth = scrollEl.current.offsetWidth;
      const centerPosition = (containerWidth - cardWidth) / 2;

      scrollEl.current.scrollTo({
        left: currIndex * (cardWidth + gap) - centerPosition + cardWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [currIndex]);

  useEffect(() => {
    autoRef.current = window.setInterval(() => {
      setCurrIndex((prevIndex) => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0));
    }, 5000);

    return () => {
      if (autoRef.current !== null) {
        clearInterval(autoRef.current);
      }
    };
  });

  const next = () => {
    setCurrIndex((prevIndex) => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0));
  };

  const prev = () => {
    setCurrIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1));
  };

  return (
    <section className="py-12 bg-white dark:bg-transparent dark:border">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
        Testimonials
      </h2>
      <p className="text-sm md:text-lg text-gray-600 text-center mb-12 leading-relaxed max-w-2xl mx-auto">
        Hear from our members about their transformative experiences with our committees.
      </p>

      <div className="relative w-full max-w-5xl mx-auto">
        <div
          ref={scrollEl}
          className="flex justify-start items-center overflow-x-hidden scrollbar-hide py-5"
          style={{ scrollBehavior: 'smooth', overflowY: 'hidden' }}
        >
          <div className="min-w-[135px] md:min-w-[225px]" />
          {testimonials.map((testimonial, index) => {
            const isActive = index === currIndex;

            return (
              <div
                key={index}
                className={`transition-all duration-500 ease-in-out rounded-lg p-6 md:p-8 shadow-xl transform my-5 md:my-10 overflow-hidden  -z-0 ${
                  isActive
                    ? 'border blur-none z-10 hover:scale-105'
                    : 'scale-95 blur-sm opacity-70 dark:bg-transparent dark:border dark:opacity-80'
                }`}
                style={{
                  minWidth: window.innerWidth < 640 ? '280px' : '450px',
                  margin: '0 8px',
                }}
                aria-hidden={!isActive}
              >
                {/* avatar and name */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 md:w-16 h-12 md:h-16 rounded-full border-4 border-blue-400 shadow-md"
                  />
                  <div>
                    <p className="text-sm md:text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                {/* feedback */}
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 md:mb-6 leading-relaxed text-xs md:text-base">
                  &quot;{testimonial.feedback}&quot;
                </p>

                {/* rating */}
                <div className="flex justify-end">
                  <span className="text-yellow-500 text-lg md:text-2xl flex">
                    {'★'.repeat(testimonial.rating)}
                    {'☆'.repeat(5 - testimonial.rating)}
                  </span>
                </div>
                <div className="cardShadow z-1 absolute bg-radial-primary-1 blur-100 group-hover:blur-60 group-hover:rotate-45 transition duration-400"></div>
              </div>
            );
          })}
          <div className="min-w-[40px] md:min-w-[225px]" />
        </div>

        {/* navigation arrows */}
        <div className="absolute top-1/2 left-4 md:left-6 transform -translate-y-1/2">
          <button
            onClick={prev}
            className="group bg-gradient-to-br from-green-500 to-blue-500 p-2 md:p-3 rounded-full text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-400"
            aria-label="Previous"
          >
            <ArrowLeft className="w-5 h-5 md:w-7 md:h-7 group-hover:animate-slide-left" />
          </button>
        </div>

        <div className="absolute top-1/2 right-4 md:right-6 transform -translate-y-1/2">
          <button
            onClick={next}
            className="group bg-gradient-to-br from-green-500 to-blue-500 p-2 md:p-3 rounded-full text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-400 z-20"
            aria-label="Next"
          >
            <ArrowRight className="w-5 h-5 md:w-7 md:h-7 group-hover:animate-slide-right" />
          </button>
        </div>
      </div>
    </section>
  );
};
