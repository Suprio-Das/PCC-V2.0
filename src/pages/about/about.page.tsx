import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SparklesCore } from '@/components/ui/sparkles';
import { Link } from 'react-router-dom';
import { RoutePaths } from '@/types/route.type';
import { useTheme } from '@/components/theme-provider';
import { ImageContainer } from '@/types/assets.type';

const AboutPage = () => {
  const { theme } = useTheme();
  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white flex flex-col items-center px-6 py-12 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-primary">About PCIU Computer Club</h1>
          <p className="mt-4 text-gray-700 dark:text-gray-100 max-w-2xl mx-auto">
            At PCIU Computer Club, we are passionate about building a community of innovators, creators, and tech
            enthusiasts. Our mission is to empower students with the skills and resources they need to succeed in the
            digital age.
          </p>
        </motion.div>

        {/* About Section */}
        <motion.div
          className="mt-12 grid gap-12 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Image Section */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={ImageContainer.Lab.src}
              alt={ImageContainer.Lab.alt}
              className="rounded-lg shadow-lg max-h-60 w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div className="text-left" initial={{ x: 20 }} animate={{ x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-semibold text-primary">Our Story</h2>
            <p className="mt-4 text-gray-700 dark:text-gray-100">
              PCIU Computer Club started with a group of students who wanted to make a difference through technology.
              Since then, we have grown into a vibrant community that promotes learning, collaboration, and innovation.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-100">
              We host workshops, hackathons, and coding boot camps aimed at providing practical experience. Whether
              you&apos;re interested in software development, cybersecurity, or AI, there&apos;s a place for you here.
            </p>
          </motion.div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-primary">Our Vision & Mission</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-100">
            Our vision is to cultivate a culture of innovation and excellence among students. We aim to inspire a new
            generation of tech-savvy leaders equipped to tackle real-world challenges.
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-100 pb-2">
            Our mission is to provide opportunities for skill development, networking, and hands-on experience. We
            believe in creating a supportive environment where students can unleash their full potential.
          </p>
        </motion.div>

        <div className="h-[15rem] md:h-[25rem] lg:h-[30rem]  w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          <Link
            to={RoutePaths.JOIN}
            className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-black dark:text-white relative z-20 hover:cursor-pointer hover:text-primary transition-all"
          >
            Join PCC
          </Link>
          <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor={theme === 'dark' ? '#FFFFFF' : '#008000'}
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AboutPage;
