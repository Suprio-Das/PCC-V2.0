import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SparklesCore } from '@/components/ui/sparkles';
import { Link } from 'react-router-dom';
import { RoutePaths } from '@/types/route.type';
import { useTheme } from '@/components/theme-provider';
import labImage from '../../assets/lab.jpg';
import visionImage from '../../assets/about1.jpg';
import missionImage from '../../assets/about2.jpg';

export const AboutPage = () => {
  const { theme } = useTheme();

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden">
        {/* Background Gradient Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-gray-900 dark:via-gray-800 dark:to-green-950 z-0 animate-gradient-xy" />

        {/* Floating Lines */}
        <div className="absolute top-0 left-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40 blur-sm animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40 blur-sm animate-pulse-slow" />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-green-700 dark:text-green-400 font-garamond drop-shadow-md">
            About PCIU Computer Club
          </h1>
          <p className="mt-6 text-gray-700 dark:text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed font-poppins">
            We are a community of innovators, creators, and dreamers united by our love for technology. Our goal is to
            empower students with knowledge, skills, and real-world opportunities to shine in the digital era.
          </p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Image with Glow */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 blur-2xl rounded-3xl" />
          <img src={labImage} alt="lab" className="relative rounded-2xl shadow-2xl object-cover max-h-80 w-full" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 font-garamond mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            PCIU Computer Club began as a small initiative by a group of passionate students eager to make a change
            through technology. Over time, it evolved into a thriving hub of learning, creativity, and collaboration.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            From coding bootcamps to hackathons and AI workshops, we’ve built a platform where every tech enthusiast can
            explore, learn, and innovate.
          </p>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center mb-20"
          >
            {/* Vision */}
            <div className="text-left space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-green-600 dark:text-green-400 font-garamond">
                Our Vision
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Our vision is to cultivate a future where technology empowers every student to innovate, lead, and make
                meaningful change. We aim to create an environment where curiosity drives creativity and learning never
                stops.
              </p>
            </div>

            {/* Image */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 blur-2xl rounded-3xl" />
              <img
                src={visionImage}
                alt="vision"
                className="relative rounded-2xl shadow-2xl object-cover h-full w-96 "
              />
            </motion.div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Image (Mission) */}
            <motion.div
              className="relative flex justify-center order-2 md:order-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 blur-2xl rounded-3xl" />
              <img
                src={missionImage}
                alt="mission"
                className="relative rounded-2xl shadow-2xl object-cover h-96 w-96"
              />
            </motion.div>

            {/* Text (Mission) */}
            <div className="text-left space-y-4 order-1 md:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-green-600 dark:text-green-400 font-garamond">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Our mission is to nurture creativity and collaboration through hands-on learning. We provide a platform
                for students to explore new technologies, share ideas, and build projects that make an impact.
              </p>
            </div>
          </motion.div>
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

        {/* Sparkle Effect */}
        <div className="w-[40rem] h-40 relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px w-3/4" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1000}
            className="w-full h-full"
            particleColor={theme === 'dark' ? '#FFFFFF' : '#00b36b'}
          />
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </section>

      <Footer />
    </>
  );
};
