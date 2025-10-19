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

export const AdvisorPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <section id="advisor" className="container py-16 px-6 md:px-12 flex flex-col gap-10 items-center text-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold font-garamond text-green-600 dark:text-green-300 mb-4">
            Meet Our Honorable Advisors
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8">
            Our advisors are the guiding force behind every success we achieve. With their experience, wisdom, and
            encouragement, they help us navigate challenges and uphold the vision that drives our community forward.
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {AdvisorPanelList.map((person, idx) => (
              <Card
                key={idx}
                className="
                group relative flex flex-col justify-between overflow-hidden
                rounded-2xl border border-gray-200 dark:border-gray-700
                bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-green-950
                shadow-md hover:shadow-xl transition-all duration-500 ease-out
                hover:-translate-y-2 hover:scale-[1.01]
                p-6
                before:absolute before:inset-0 before:bg-gradient-to-t before:from-green-100/20 before:to-transparent dark:before:from-green-400/5 before:opacity-0 group-hover:before:opacity-100 before:transition-all
              "
              >
                <div className="absolute -inset-[1px] bg-gradient-to-r from-green-400/20 to-emerald-500/20 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700"></div>

                {/* Image  */}
                <div className="relative flex items-center justify-center mb-4">
                  <div className="relative w-48 overflow-hidden rounded-xl shadow-sm">
                    <img
                      src={person.photo.src}
                      alt={person.photo.alt}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out border"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Text  */}
                <CardContent className="text-center space-y-1 relative z-10">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white font-garamond tracking-wide">
                    {person.name}
                  </CardTitle>
                  <p className="text-sm text-green-700 dark:text-green-400 font-semibold uppercase tracking-wide">
                    {person.designation}
                  </p>
                </CardContent>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400/70 to-emerald-500/70 transition-all duration-500 group-hover:w-full" />
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};
