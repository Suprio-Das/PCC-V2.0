import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CardContent, CardTitle } from '../../components/ui/card';
import { ImageContainer } from '@/types/assets.type';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface People {
  name: string;
  designation: string;
  photo: {
    src: string;
    alt: string;
  };
}

// Session 24-25
const PeopleList24_25: People[] = [
  {
    name: 'Md. Faysal Hossen',
    designation: 'President',
    photo: { src: ImageContainer.Faysal.src, alt: ImageContainer.Faysal.alt },
  },
  {
    name: 'Istiaque Uddin Hyder',
    designation: 'General Secretary',
    photo: { src: ImageContainer.ShohanOfficial.src, alt: ImageContainer.ShohanOfficial.alt },
  },
  {
    name: 'Rakibul Hassan',
    designation: 'Joint General Secretary',
    photo: { src: ImageContainer.Rakib.src, alt: ImageContainer.Rakib.alt },
  },
  {
    name: 'Md. Akibur Rahman',
    designation: 'Secretary of Competitive Programming',
    photo: { src: ImageContainer.Akib.src, alt: ImageContainer.Akib.alt },
  },
];

// Session 23-24
const PeopleList23_24: People[] = [
  { name: 'John Doe', designation: 'President', photo: { src: ImageContainer.Faysal.src, alt: 'John Doe' } },
  {
    name: 'Jane Smith',
    designation: 'General Secretary',
    photo: { src: ImageContainer.ShohanOfficial.src, alt: 'Jane Smith' },
  },
  {
    name: 'Ali Ahmed',
    designation: 'Joint General Secretary',
    photo: { src: ImageContainer.Rakib.src, alt: 'Ali Ahmed' },
  },
  {
    name: 'Sara Khan',
    designation: 'Secretary of Competitive Programming',
    photo: { src: ImageContainer.Akib.src, alt: 'Sara Khan' },
  },
];

export const ExecutivePage = () => {
  const [activeTab, setActiveTab] = useState<'Session 24-25' | 'Session 23-24'>('Session 24-25');
  const peopleToShow = activeTab === 'Session 24-25' ? PeopleList24_25 : PeopleList23_24;

  return (
    <>
      <Navbar />
      <section className="container py-16 px-6 md:px-12 flex flex-col gap-10 items-center text-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold font-garamond text-green-600 dark:text-green-300 mb-6">
            Meet Our Executive Committee
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8">
            The backbone of our organization, these dedicated individuals lead, inspire, and coordinate every initiative
            to help our community grow stronger.
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            {['Session 24-25', 'Session 23-24'].map((session) => (
              <button
                key={session}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === session
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-green-600 border border-green-600 hover:bg-green-50'
                }`}
                onClick={() => setActiveTab(session as 'Session 24-25' | 'Session 23-24')}
              >
                {session}
              </button>
            ))}
          </div>
        </div>

        {/* Cards with animation */}
        <div className="w-full flex flex-col items-center gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {peopleToShow.map((person, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-green-950 shadow-md p-6"
                >
                  <div className="relative flex items-center justify-center mb-4">
                    <div className="relative w-48 overflow-hidden rounded-xl shadow-sm">
                      <img
                        src={person.photo.src}
                        alt={person.photo.alt}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out border"
                      />
                    </div>
                  </div>
                  <CardContent className="text-center space-y-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white font-garamond tracking-wide">
                      {person.name}
                    </CardTitle>
                    <p className="text-sm text-green-700 dark:text-green-400 font-semibold uppercase tracking-wide">
                      {person.designation}
                    </p>
                  </CardContent>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </>
  );
};
