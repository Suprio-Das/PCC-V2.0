import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from './ui/card';
import { FaTwitter, FaLinkedin, FaDribbble } from 'react-icons/fa';
import { ImageContainer } from '@/types/assets.type';

interface People {
  name: string;
  designation: string;
  photo: {
    src: string;
    alt: string;
  };
}

const PeopleList: People[] = [
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

export const Executive = () => {
  const navigate = useNavigate();

  return (
    <section id="people" className="container py-16 px-6 md:px-12 flex flex-col gap-10 items-center">
      {/* Panel Title */}
      <div className="bg-green-100 border border-green-400 rounded px-6 py-3 mb-4">
        <h3 className="font-semibold text-lg text-green-800 md:text-2xl">Committee Members</h3>
      </div>

      {/* Executive Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {PeopleList.map((person, idx) => (
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
      </div>

      {/* Button */}
      <button
        className="join-pcc-btn font-garamond flex items-center gap-2 mt-4 text-green-700 transition hover:text-white btn"
        onClick={() => navigate('/executive')}
      >
        See More
      </button>
    </section>
  );
};
