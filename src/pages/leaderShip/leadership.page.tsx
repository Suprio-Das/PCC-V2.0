import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TestimonialSection } from '@/components/Testmonial';
import { ScrollToTop } from '@/components/ScrollToTop';
import { CommitteeSection } from '@/components/Committee';
import Vector1 from '@/assets/vector1.mp4';

// achievements Data
const achievements = [
  {
    id: 1,
    title: 'Achievement 1',
    description:
      'This landmark achievement solidified our club’s reputation as a leader in the tech community, setting new standards for excellence.',
  },
  {
    id: 2,
    title: 'Achievement 2',
    description:
      'A major breakthrough led by this committee that positioned our club at the forefront of innovation in the tech industry.',
  },
  {
    id: 3,
    title: 'Achievement 3',
    description: 'A noteworthy accomplishment that has become a cornerstone of our club’s ongoing success.',
  },
];

export const LeadershipPage = () => {
  return (
    <>
      <Navbar />

      <section className="relative h-48 md:h-80 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-300 text-white dark:from-gray-800 dark:to-gray-600">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70">
          <source src={Vector1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 text-center p-4 md:p-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-lg leading-tight">
            Our Legacy of Leadership
          </h1>
          <p className="text-base md:text-lg lg:text-xl mt-2 drop-shadow-md leading-relaxed">
            Shaping the future of technology with innovation and leadership.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-14 relative">
        <CommitteeSection />

        <section className="py-12">
          <h2 className="text-3xl md:text-4xl  font-bold text-gray-800 text-center mb-6 dark:text-white">
            Committee Milestones & Achievements
          </h2>
          <p className="text-base md:text-lg text-gray-400 text-center mb-10 leading-relaxed max-w-3xl mx-auto">
            Our committees have driven key milestones that continue to shape our club’s success. Below are some
            significant achievements from their tenure.
          </p>

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 relative dark:bg-transparent dark:border"
              >
                <h3 className="text-lg md:text-xl lg:text-xl font-bold text-primary mb-3">{achievement.title}</h3>
                <p className="text-gray-400 text-sm md:text-base mb-4">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* video section */}
        <section className="py-16 bg-white dark:bg-transparent">
          <h2 className="text-3xl md:text-4xl  font-extrabold text-gray-800 text-center mb-6 dark:text-white">
            Watch Our Highlights
          </h2>
          <p className="text-base md:text-lg text-gray-400 dark:text-gray-300 text-center mb-10 leading-relaxed max-w-3xl mx-auto">
            Discover the achievements and innovative contributions our committees have made through this highlight
            video.
          </p>

          <div className="flex justify-center mb-10">
            <div className="relative group overflow-hidden rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <iframe
                width="100%"
                height=""
                src="https://www.youtube.com/embed/example"
                title="Committee Highlights"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg aspect-video md:h-[480px]"
              ></iframe>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="#"
              className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400 px-6 py-3 rounded-full shadow-lg text-sm md:text-base transition-all duration-300 ease-in-out neon-glow"
            >
              Learn More About Our Projects
            </a>
          </div>
        </section>

        <TestimonialSection />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};
