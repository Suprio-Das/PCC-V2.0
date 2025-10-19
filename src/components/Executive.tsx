import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import { Card, CardContent, CardTitle } from './ui/card';
import { ImageContainer } from '@/types/assets.type';
import React from 'react';

interface Social {
  icon: React.ReactNode;
  link: string;
}

interface People {
  name: string;
  designation: string;
  photo: {
    src: string;
    alt: string;
  };
  social: Social[];
}

const PeopleList: People[] = [
  {
    name: 'Md. Faysal Hossen',
    designation: 'President',
    photo: {
      src: ImageContainer.Faysal.src,
      alt: ImageContainer.Faysal.alt,
    },
    social: [
      { icon: <Icon icon="basil:linkedin-outline" />, link: 'https://www.linkedin.com/in/faysal-sk-a75983261/' },
      { icon: <Icon icon="iconoir:facebook" />, link: 'https://www.facebook.com/faysal.shikder.988' },
    ],
  },
  {
    name: 'Istiaque Uddin Hyder',
    designation: 'General Secretary',
    photo: {
      src: ImageContainer.ShohanOfficial.src,
      alt: ImageContainer.ShohanOfficial.alt,
    },
    social: [
      { icon: <Icon icon="mdi:github" />, link: 'https://github.com/shohan-hyder' },
      { icon: <Icon icon="basil:linkedin-outline" />, link: 'https://www.linkedin.com/in/shohan-hyder/' },
      { icon: <Icon icon="iconoir:facebook" />, link: 'https://www.facebook.com/ShohanHyder777' },
    ],
  },
  {
    name: 'Rakibul Hassan',
    designation: 'Joint General Secretary',
    photo: {
      src: ImageContainer.Rakib.src,
      alt: ImageContainer.Rakib.alt,
    },
    social: [
      { icon: <Icon icon="mdi:github" />, link: 'https://github.com/Rakibul-Hassan-1' },
      { icon: <Icon icon="basil:linkedin-outline" />, link: 'https://www.linkedin.com/in/rakibul-hassan-467a941b4/' },
      { icon: <Icon icon="iconoir:facebook" />, link: 'https://www.facebook.com/rakibul.hassan.416569' },
    ],
  },
  {
    name: 'Md. Akibur Rahman',
    designation: 'Secretary of Competitive Programming',
    photo: {
      src: ImageContainer.Akib.src,
      alt: ImageContainer.Akib.alt,
    },
    social: [
      { icon: <Icon icon="streamline:web" />, link: 'https://akibur.web.app' },
      { icon: <Icon icon="basil:linkedin-outline" />, link: 'https://www.linkedin.com/in/akibur-r/' },
      { icon: <Icon icon="iconoir:facebook" />, link: 'https://www.facebook.com/ar.akib2d' },
    ],
  },
];

export const Executive = () => {
  const navigate = useNavigate();

  return (
    <section id="people" className="py-10 px-6 md:px-12 flex flex-col gap-10 items-center">
      {/* Committee Panel Section */}
      <div className="w-full flex flex-col items-center gap-8">
        {/* Panel Title */}
        <div className="bg-green-100 border border-green-400 rounded px-6 py-3 mb-4">
          <h3 className="font-semibold text-lg text-green-800 md:text-2xl">Committe Members</h3>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {PeopleList.map((person, idx) => (
            <Card
              key={idx}
              className="
                group relative flex flex-col justify-between overflow-hidden
                border-none rounded-2xl dark:bg-gray-900 bg-white
                shadow-sm hover:shadow-xl transition-all duration-300
                hover:-translate-y-1 hover:bg-green-50
                p-6
              "
            >
              {/* Image Section */}
              <div className="relative flex items-center justify-center mb-4">
                <img
                  src={person.photo.src}
                  alt={person.photo.alt}
                  className="w-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text Section */}
              <CardContent className="text-center space-y-2">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white font-garamond">
                  {person.name}
                </CardTitle>
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">{person.designation}</p>
              </CardContent>

              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-3">
                {person.social.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-400 transition-all duration-300 group-hover:w-full" />
            </Card>
          ))}
        </div>

        {/* Button */}
        <button
          className="join-pcc-btn font-garamond flex items-center gap-2 mt-4 text-green-700 transition hover:text-white btn"
          onClick={() => navigate('/executive')}
        >
          See More
        </button>
      </div>
    </section>
  );
};
