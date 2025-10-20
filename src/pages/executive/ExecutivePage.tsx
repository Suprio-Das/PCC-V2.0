import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardTitle } from '../../components/ui/card';
import { ImageContainer } from '@/types/assets.type';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaDribbble } from 'react-icons/fa';

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
        {/* Title */}
        <div className="max-w-2xl">
          <div className="bg-green-100 border border-green-400 rounded px-6 py-3 mb-10">
            <h3 className="font-semibold text-lg text-green-800 md:text-2xl">Committee Members</h3>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            {['Session 24-25', 'Session 23-24'].map((session) => (
              <button
                key={session}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === session
                    ? 'bg-green-200 text-green-700 shadow-lg scale-105'
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
          >
            {peopleToShow.map((person, idx) => (
              <Card
                key={idx}
                className="w-full max-w-[260px] bg-white dark:bg-gray-800 
                  flex flex-col items-center text-center p-6 transition-all hover:shadow-lg 
                  hover:-translate-y-1 hover:bg-green-50 border border-gray-200 rounded-2xl"
              >
                <img
                  src={person.photo.src}
                  alt={person.photo.alt}
                  className="w-24 h-24 rounded-full object-cover border border-green-700 mb-4"
                />
                <CardContent className="space-y-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{person.name}</CardTitle>
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium">{person.designation}</p>
                </CardContent>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-4 text-green-600 dark:text-green-400 mt-4">
                  <a href="#" className="hover:text-green-800">
                    <FaTwitter />
                  </a>
                  <a href="#" className="hover:text-green-800">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="hover:text-green-800">
                    <FaDribbble />
                  </a>
                </div>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
      <Footer />
    </>
  );
};
