import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SparklesCore } from '@/components/ui/sparkles';
import { Link } from 'react-router-dom';
import { RoutePaths } from '@/types/route.type';
import { useTheme } from '@/components/theme-provider';
import { FaLeaf, FaUsers, FaGem } from 'react-icons/fa';
import { useState } from 'react';
import labImage from '../../assets/lab.jpg';
import missionImage from '../../assets/about1.jpg';
import visionImage from '../../assets/about2.jpg';

export const AboutPage = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'story' | 'mission' | 'vision'>('story');

  const tabContent = {
    story: {
      title: 'Our Story',
      text: `PCIU Computer Club began as a small initiative by a group of passionate students eager to make a change through technology. Over time, it evolved into a thriving hub of learning, creativity, and collaboration. From coding bootcamps to hackathons and AI workshops, we’ve built a platform where every tech enthusiast can explore, learn, and innovate.`,
      image: labImage,
    },
    mission: {
      title: 'Our Mission',
      text: `Our mission is to nurture creativity and collaboration through hands-on learning. We provide a platform for students to explore new technologies, share ideas, and build projects that make an impact. We aim to empower every student to gain real-world skills while working on exciting tech projects.`,
      image: missionImage,
    },
    vision: {
      title: 'Our Vision',
      text: `Our vision is to cultivate a future where technology empowers every student to innovate, lead, and make meaningful change. We aim to create an environment where curiosity drives creativity and learning never stops.`,
      image: visionImage,
    },
  };

  const values = [
    {
      icon: <FaLeaf className="text-green-700 text-3xl" />,
      title: 'Sustainability',
      desc: 'Eco-friendly projects and green initiatives.',
    },
    {
      icon: <FaUsers className="text-green-700 text-3xl" />,
      title: 'Inclusivity',
      desc: 'Everyone is welcome to join and collaborate.',
    },
    {
      icon: <FaGem className="text-green-700 text-3xl" />,
      title: 'Quality',
      desc: 'High-quality mentorship and learning resources.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-green-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center pt-24 px-6 overflow-hidden dark:from-gray-900 dark:to-gray-950">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl   drop-shadow-md bg-gradient-to-r from-primary to-black dark:to-white text-transparent bg-clip-text">
              About Us
            </h1>
            <p className="mt-6 text-gray-700 dark:text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed font-poppins">
              We are a community of innovators, creators, and dreamers united by our love for technology. Our goal is to
              empower students with knowledge, skills, and real-world opportunities to shine in the digital era.
            </p>
          </motion.div>
        </section>

        {/* Horizontal Tabs Section */}
        <section className="container mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-16 items-start">
          {/* Tabs */}
          <div className="flex flex-col">
            <div className="mb-8 text-start">
              <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 font-garamond">
                PCIU <br /> Computer Club
              </h2>
            </div>
            <div className="flex space-x-4 mb-6">
              {(['story', 'mission', 'vision'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-t-xl font-semibold transition-colors border border-green-300 ${
                    activeTab === tab
                      ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-white shadow-md border-none'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900'
                  }`}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>
            <motion.div
              className=" dark:bg-gray-900 rounded-b-2xl text-gray-700 dark:text-gray-300"
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {tabContent[activeTab].text}
            </motion.div>
          </div>

          {/* Right Side Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-2 rounded-3xl" />
            <img
              src={tabContent[activeTab].image}
              alt={tabContent[activeTab].title}
              className="relative rounded-2xl shadow-2xl object-cover h-full w-full max-h-96"
            />
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-green-700 dark:text-green-400 font-garamond mb-6">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-green-100 dark:bg-green-100 p-4 rounded-full mb-4">{val.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{val.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Join Section */}
        <section className="relative h-[20rem] md:h-[28rem] w-full flex flex-col items-center justify-center overflow-hidden">
          <Link
            to={RoutePaths.JOIN}
            className="md:text-7xl text-4xl lg:text-8xl font-extrabold text-center text-green-700 dark:text-white relative z-20 hover:text-emerald-400 transition-all font-garamond"
          >
            Join PCC
          </Link>

          <div className="w-[40rem] h-40 relative">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1000}
              className="w-full h-full"
              particleColor={theme === 'dark' ? '#FFFFFF' : '#00b36b'}
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};
