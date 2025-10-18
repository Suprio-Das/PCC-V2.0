import { useNavigate } from 'react-router-dom';
import JoinPccBtn from './customized/JoinPccBtn/JoinPccBtn';
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
    <section className="container mx-auto py-12 md:py-16 md:-mt-48 -mt-48">
      {/* Small heading */}
      <p className="text-green-500 text-sm md:text-[18px] font-garamond text-center mb-6">About Us</p>

      {/* Main heading */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mt-2">About PCIU Computer Club</h2>

      {/* Description */}
      <p className="max-w-3xl text-sm md:text-base mx-auto text-center text-gray-600 dark:text-gray-300 mt-6">
        At PCIU Computer Club, we are passionate about building a community of innovators, creators, and tech
        enthusiasts. Our mission is to empower students with the skills and resources they need to succeed in the
        digital age.
      </p>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-8 mt-10 w-full max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="p-6 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col bg-white dark:bg-gray-800"
          >
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Join Button */}
      <div className="mt-10 flex justify-center">
        <JoinPccBtn onClick={() => navigate('/join')} />
      </div>
    </section>
  );
};
