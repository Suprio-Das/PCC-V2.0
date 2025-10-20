import { motion } from 'framer-motion';
import { FaMicrophone, FaUsers, FaLightbulb, FaGlobe, FaMusic } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';

const JoinEvent = () => {
  const items = [
    {
      icon: <FaMicrophone className="text-3xl text-green-500" />,
      title: 'Great Speakers',
      desc: 'Learn from leading experts sharing their insights and experiences.',
    },
    {
      icon: <FaUsers className="text-3xl text-green-500" />,
      title: 'Networking Session',
      desc: 'Connect with professionals, students, and innovators in tech.',
    },
    {
      icon: <FaLightbulb className="text-3xl text-green-500" />,
      title: 'Get Inspired',
      desc: 'Discover new ideas and possibilities to fuel your journey.',
    },
    {
      icon: <FaGlobe className="text-3xl text-green-500" />,
      title: 'Global Event',
      desc: 'An event that brings together the local and global tech community.',
    },
    {
      icon: <FaPeopleGroup className="text-3xl text-green-500" />,
      title: 'New People',
      desc: 'Build friendships that go beyond the boundaries of departments.',
    },
    {
      icon: <FaMusic className="text-3xl text-green-500" />,
      title: 'Fun & Culture',
      desc: 'Music, art, and celebration — an event you’ll always remember.',
    },
  ];

  return (
    <section className="my-32 py-16 bg-green-50 dark:bg-gray-800">
      <div className="text-center mb-12">
        <p className="uppercase text-green-500  mb-2">— Why Join the Event? —</p>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">Why You Should Join the Event</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto">
          Discover inspiration, meet new people, and experience innovation like never before!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-2xl p-8 flex flex-col items-center relative overflow-hidden border border-green-100 dark:border-green-900 hover:border-green-400 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center bg-green-100 rounded-full h-16 w-16 mb-6">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JoinEvent;
