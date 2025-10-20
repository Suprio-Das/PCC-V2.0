import { FaTwitter, FaLinkedin, FaDribbble } from 'react-icons/fa';
import { Card, CardContent, CardTitle } from '../../components/ui/card';
import Chairman from '../../assets/manoara.png';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface People {
  name: string;
  designation: string;
  photo: {
    src: string;
    alt: string;
  };
  contact: string;
  bio?: string;
}

const AdvisorPanelList: People[] = [
  {
    name: 'Manoara Begum',
    designation: 'Chairman',
    photo: { src: Chairman, alt: 'Chairman' },
    contact: 'advisor1@example.com',
    bio: 'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.',
  },
  {
    name: 'Advisor Name 2',
    designation: 'Designation 2',
    photo: { src: 'https://via.placeholder.com/150', alt: 'Advisor 2' },
    contact: 'advisor2@example.com',
    bio: 'Expert in software development and AI research.',
  },
  {
    name: 'Advisor Name 3',
    designation: 'Designation 3',
    photo: { src: 'https://via.placeholder.com/150', alt: 'Advisor 3' },
    contact: 'advisor3@example.com',
    bio: 'Specialist in data science and machine learning.',
  },
  {
    name: 'Advisor Name 4',
    designation: 'Designation 4',
    photo: { src: 'https://via.placeholder.com/150', alt: 'Advisor 4' },
    contact: 'advisor4@example.com',
    bio: 'Leader in community engagement and innovation.',
  },
];

export const AdvisorPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <section id="advisor" className="container py-16 px-6 md:px-12 flex flex-col gap-10 items-center">
        {/* Advisor Panel Section */}
        <div className="w-full flex flex-col items-center gap-8">
          {/* Panel Title */}
          <div className="bg-green-100 border border-green-400 rounded px-6 py-3 mb-4">
            <h3 className="font-semibold text-lg text-green-800 md:text-2xl">Advisor Panel</h3>
          </div>

          {/* Card Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {AdvisorPanelList.map((person, idx) => (
              <Card
                key={idx}
                className="w-full max-w-[260px]  dark:bg-gray-800 
              flex flex-col items-center text-center p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-green-50 border-gray-200 border"
              >
                <img
                  src={person.photo.src}
                  alt={person.photo.alt}
                  className="w-24 h-24 rounded-full object-cover border border-green-700 mb-4"
                />
                <CardContent className="space-y-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{person.name}</CardTitle>
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium">{person.designation}</p>
                  {person.bio && <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{person.bio}</p>}
                </CardContent>
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
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};
