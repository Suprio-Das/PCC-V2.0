import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from './ui/card';
import Chairman from '../assets/manoara.png';

interface People {
  name: string;
  designation: string;
  photo: {
    src: string;
    alt: string;
  };
  contact: string;
}

const AdvisorPanelList: People[] = [
  {
    name: 'Manoara Begum',
    designation: 'Chairman',
    photo: {
      src: Chairman,
      alt: 'Chairman',
    },
    contact: 'advisor1@example.com',
  },
  {
    name: 'Advisor Name 2',
    designation: 'Designation 2',
    photo: {
      src: '/placeholder-advisor-2.jpg',
      alt: 'Advisor 2',
    },
    contact: 'advisor2@example.com',
  },
  {
    name: 'Advisor Name 3',
    designation: 'Designation 3',
    photo: {
      src: '/placeholder-advisor-3.jpg',
      alt: 'Advisor 3',
    },
    contact: 'advisor3@example.com',
  },
  {
    name: 'Advisor Name 4',
    designation: 'Designation 4',
    photo: {
      src: '/placeholder-advisor-4.jpg',
      alt: 'Advisor 4',
    },
    contact: 'advisor4@example.com',
  },
];

export const Advisor = () => {
  const navigate = useNavigate();

  return (
    <section id="advisor" className="py-16 px-6 md:px-12 flex flex-col gap-10 items-center">
      {/* Section Header */}
      <header className="flex flex-col gap-2 text-center">
        <p className="text-green-500 text-sm md:text-lg font-garamond">People in Charge</p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Who tirelessly contributes to the <br />
          <span className="text-green-600">community</span>
        </h2>
      </header>

      {/* Advisor Panel Section */}
      <div className="w-full flex flex-col items-center gap-8">
        {/* Panel Title */}
        <div className="bg-green-100 border border-green-400 rounded px-6 py-3 mb-4">
          <h3 className="font-semibold text-lg text-green-800 md:text-2xl">Advisor Panel</h3>
        </div>
        {/* Advisor Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {AdvisorPanelList.map((person, idx) => (
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
                  className="w-48 object-cover  group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text Section */}
              <CardContent className="text-center space-y-1">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white font-garamond">
                  {person.name}
                </CardTitle>
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">{person.designation}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">{person.contact}</p>
              </CardContent>

              {/* Subtle hover accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-400 transition-all duration-300 group-hover:w-full" />
            </Card>
          ))}
        </div>
        {/* Button */}{' '}
        <button
          className="join-pcc-btn font-garamond flex items-center gap-2 mt-4 text-green-700 transition hover:text-white btn"
          onClick={() => navigate('/advisor')}
        >
          {' '}
          See More{' '}
        </button>
      </div>
    </section>
  );
};
