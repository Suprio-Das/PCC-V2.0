import { motion } from 'framer-motion';
import FirstAnniversaryBanner from '@/assets/first-anniversary-banner.jpg';
import semanisul from '@/assets/Seminar-Anis.png';
import contest1 from '@/assets/contest1.jpg';
import contest2 from '@/assets/Contest2.jpg';
import contest3 from '@/assets/Contest3.jpg';
import contest4 from '@/assets/Contest4.jpg';
import workshop from '@/assets/workshop.jpg';
import Incep from '@/assets/inception.jpg';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface TimelineItem {
  title: string;
  date: string;
  heading: string;
  paragraph: string;
  images: string[];
}

export function TimelinePage() {
  const data: TimelineItem[] = [
    {
      title: 'Inception',
      date: 'on December 7, 2021',
      heading: 'Code, Create, Connect – Be Part of the Computer Club!',
      paragraph:
        'The PCIU Computer Club was founded to create a dynamic, inclusive, and innovative community for students passionate about technology, programming, and digital solutions. Our mission is to empower members through collaborative learning, hands-on projects, and networking with industry professionals.',
      images: [Incep],
    },
    {
      title: 'Contest',
      date: 'on August 13, 2023',
      heading: 'Groundbreaking Concepts Illuminate the PCIU Computer Science Poster Presentation Contest.',
      paragraph:
        'The Department of Computer Science and Engineering at Port City International University held a poster presentation contest on August 13, 2023, featuring 45 students and faculty members. The top three teams, "Team Tri-Wizard," “Team-IOT,” and "Team-Port-AI," presented innovative ideas on sustainable agriculture and AI-powered agricultural drones for precision farming.',
      images: [contest1, contest2, contest3, contest4],
    },
    {
      title: 'Workshop',
      date: 'September 10, 2023',
      heading: 'Fueling Passion: PCIU Computer Club Meeting on Competitive Programming and the ICPC 2023 Adventure.',
      paragraph:
        'The PCIU Computer Club hosted a meeting on September 10th, 2023, to discuss competitive programming and the ICPC 2023 adventure, aiming to ignite passion for coding.',
      images: [workshop],
    },
    {
      title: 'Seminar',
      date: 'on November 18, 2023',
      heading:
        "Exploring Tech Frontiers: Anisul Islam's Seminar on Competitive Programming and Career Insights at PCIU Computer Club.",
      paragraph:
        'Anisul Islam, a seasoned Software Engineer and Full Stack Trainer, led a seminar on competitive programming and career landscapes in Computer Science at the PCIU Computer Club. The event provided insights into international education and dynamic opportunities in the tech industry.',
      images: [semanisul],
    },
    {
      title: 'Anniversary',
      date: 'on November 1, 2024',
      heading: '1st Anniversary OF PCIU Computer Club',
      paragraph:
        'Celebrating a Year of Innovation and Growth! Join us as we mark the 1st Anniversary of the PCIU Computer Club, honoring achievements, inspiring futures, and empowering tech enthusiasts. Here’s to many more years of creativity, collaboration, and coding excellence.',
      images: [FirstAnniversaryBanner],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-14 space-y-14 md:space-y-24">
        <div className="mx-auto px-4 md:px-8 lg:px-10 text-center">
          <p className="text-sm md:text-base   drop-shadow-md bg-gradient-to-r from-primary to-black dark:to-white text-transparent bg-clip-text uppercase mb-4">
            — Timeline —
          </p>
          <h2 className="text-2xl md:text-5xl font-semibold md:mb-6 mb-3 text-black dark:text-white">
            The Journey of PCIU Computer Club
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
            We&apos;ve been working for the past 1 year, trying to build a sustainable tech community. Here&apos;s a
            timeline of our activities throughout the journey.
          </p>
        </div>
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Title & Date */}
            <div className="bg-green-100 border border-green-400 rounded  px-10 py-4 w-fit mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-semibold text-green-800 mb-2">{item.title}</h2>
              <p className="text-xs opacity-90 dark:text-black">{item.date}</p>
            </div>

            {/* Heading */}
            <h3
              className="text-xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-5 duration-300 
    transform transition-transform hover:scale-105"
            >
              {item.heading}
            </h3>

            {/* Paragraph */}
            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-10">
              {item.paragraph}
            </p>

            {/* Images Section */}
            {item.images.length === 1 ? (
              <motion.img
                whileHover={{ scale: 1.03 }}
                src={item.images[0]}
                alt={item.title}
                className="rounded-xl w-full max-w-3xl object-cover shadow-md"
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 w-full">
                {item.images.map((img, i) => (
                  <motion.img
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    src={img}
                    alt={`${item.title}-${i}`}
                    className="rounded-xl object-cover w-full h-48 md:h-64 shadow-md"
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default TimelinePage;
