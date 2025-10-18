import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from './ui/card';

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
    name: 'Advisor Name 1',
    designation: 'Designation 1',
    photo: {
      src: '/placeholder-advisor-1.jpg',
      alt: 'Advisor 1',
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
    <section id="advisor" className="pt-10 container flex flex-col gap-8 items-center">
      {/* Section Header */}
      <header className="flex flex-col flex-wrap gap-1 text-center">
        <h2 className="font-semibold text-xl md:text-2xl">People in Charge</h2>
        <span className="text-base md:text-md">Who tirelessly contributes to the community</span>
      </header>

      {/* Advisor Panel Section */}
      <div className="w-full flex flex-col items-center gap-4">
        {/* Panel Title */}
        <div className="bg-green-100 border border-green-400 rounded px-4 py-2">
          <h3 className="font-semibold text-lg text-green-800">Advisor Panel</h3>
        </div>

        {/* Advisor Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {AdvisorPanelList.map((person, idx) => (
            <Card
              key={idx}
              className="w-full aspect-square p-4 flex flex-col justify-between shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">
                <img src={person.photo.src} alt={person.photo.alt} className="w-20 h-20 object-cover rounded-full" />
              </div>

              <CardContent className="pt-2 pb-0">
                <CardTitle className="text-sm font-medium text-center leading-tight">{person.name}</CardTitle>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">{person.designation}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1 italic">{person.contact}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Button */}
        <button
          className="join-pcc-btn font-garamond flex items-center gap-2 mt-4 text-green-700 transition hover:text-white btn"
          onClick={() => navigate('/join')}
        >
          See More
        </button>
      </div>
    </section>
  );
};
