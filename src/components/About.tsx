import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

export const About = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Our Story',
      description:
        'PCIU Computer Club started with a group of students who wanted to make a difference through technology. Since then, we have grown into a vibrant community that promotes learning, collaboration, and innovation. We host workshops, hackathons, and coding boot camps aimed at providing practical experience. Whether you are interested in software development, cybersecurity, or AI, there is a place for you here.',
    },
    {
      title: 'Our Vision & Mission',
      description:
        'Our vision is to cultivate a culture of innovation and excellence among students. We aim to inspire a new generation of tech-savvy leaders equipped to tackle real-world challenges. Our mission is to provide opportunities for skill development, networking, and hands-on experience. We believe in creating a supportive environment where students can unleash their full potential.',
    },
  ];

  return (
    <section className="container mx-auto -mt-52 py-8 px-6 md:px-12">
      {/* Small heading */}
      <p className="text-green-500 text-sm md:text-lg font-garamond text-center mb-4">About Us</p>
      {/* Main heading */}
      <h1 className="text-3xl md:text-6xl font-bold text-center text-gray-900 dark:text-white mb-6">
        About PCIU Computer Club
      </h1>
      {/* Description */}
      <p className="max-w-3xl text-sm md:text-base mx-auto text-center text-gray-700 dark:text-gray-300 mb-12">
        At PCIU Computer Club, we are passionate about building a community of innovators, creators, and tech
        enthusiasts. Our mission is to empower students with the skills and resources they need to succeed in the
        digital age.
      </p>
      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-12 max-w-5xl mx-auto">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            className="p-14 relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800 rounded-xl flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl text-green-600 font-bold text-center  dark:text-white md:mb-6 mb-3 font-garamond">
                {card.title}
              </CardTitle>
              <p className="border-b border-gray-100 mb-4 md:w-52 w-32 mx-auto"></p>
              <CardDescription className="p-6 text-center text-gray-500 dark:text-gray-300 text-sm md:text-base font-poppins">
                {card.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      {/* Button */}
      <div className="flex justify-center mt-6">
        <button
          className="join-pcc-btn font-garamond flex items-center gap-2 text-green-700 transition hover:text-white btn"
          onClick={() => navigate('/about')}
        >
          See More
        </button>
      </div>
    </section>
  );
};
