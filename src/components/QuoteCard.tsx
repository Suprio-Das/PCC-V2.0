import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImageContainer } from '@/types/assets.type';

interface People {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  rotate: string;
  accentColor: string;
  author: string;
  role: string;
  picture: {
    src: string;
    alt: string;
  };
}
const quoteCards: People[] = [
  {
    id: 1,
    title: 'Image MouseTrail',
    description:
      'I am honored to lead a department committed to cultivating the innovative minds of tomorrow. PCIU Computer Club is a significant stakeholder in our academic community. It has allowed us to fulfill our purpose of preparing students with the skills and expertise they need in a rapidly changing technology space. Bridging the gap between academic study and practical application, PCIU Computer Club is connecting our students to wider tech community. Cultivating leadership capabilities, seminars and various events, they are building a strong workforce within and outside academia. I encourage every member to make the most out of being in a club and utilize our resources, prepare for careers where they will become future game changers in the world of computing.',
    bgColor: 'bg-green-200',
    rotate: 'rotate-6',
    accentColor: 'bg-green-600',
    author: 'Md. Faysal Hossen',
    role: '-- President',
    picture: {
      src: ImageContainer.Faysal.src,
      alt: ImageContainer.Faysal.alt,
    },
  },
  {
    id: 2,
    title: 'Progressive Carousel',
    description:
      'Hey PCIU Computer Club Members!🚀 \n\n' +
      'As your Joint General Secretary, I’m thrilled to connect with all of you! We’re not just a club; we’re a community of innovators, creators, and problem-solvers ready to make our mark in the tech world!\n\n' +
      'Let’s take a moment to reflect: Every line of code we write is a step toward unlocking new possibilities. Each challenge we face is a chance to learn and grow. Together, we can transform those challenges into powerful breakthroughs!\n\n' +
      '🌟 Remember: The journey of a thousand codes begins with a single keystroke. So let’s embrace our curiosity, share our knowledge, and uplift one another. Whether you’re debugging a project or brainstorming your next big idea, know that you’re part of a team that’s here to support you.\n\n' +
      'Let’s make this a year of innovation and collaboration! Together, we can create something incredible. So, gear up, get inspired, and let’s code our future! Here’s to pushing boundaries and achieving greatness—together!',
    bgColor: 'bg-red-200',
    rotate: '',
    accentColor: 'bg-red-400',
    author: 'Istiaque Uddin Hyder',
    role: '-- General Secretary',
    picture: {
      src: ImageContainer.Miraz.src,
      alt: ImageContainer.Miraz.alt,
    },
  },
];

const QuoteCard = () => {
  return (
    <div className="container pt-8 px-4 font-serif">
      <main>
        <section className="text-white w-full">
          <div className="flex flex-col-reverse lg:flex-row justify-between lg:px-16 px-4 gap-8">
            <div className="grid gap-2">
              {quoteCards.map((card, index) => (
                <figure key={card.id} className="sticky top-0 h-screen grid place-content-center">
                  <article
                    className={`relative
                      w-[280px] sm:w-[340px] md:w-[400px] lg:w-[30rem]
                      min-h-[16rem] h-auto
                      rounded-lg ${card.rotate} p-4 grid grid-rows-[1fr,auto] gap-4
                      bg-card
                      transition-all duration-300 `}
                  >
                    <div
                      className={`absolute -top-3 ${index % 2 === 0 ? '-left-6' : '-right-3'} 
                        w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center z-10`}
                    >
                      <span className="text-white pt-4 text-3xl font-serif relative -rotate-12">&ldquo;</span>
                    </div>

                    <div className={`${index === 0 ? '' : 'max-h-[300px] overflow-y-auto pr-2'}`}>
                      <p className="text-sm sm:text-base text-black dark:text-white">{card.description}</p>
                    </div>

                    <div>
                      <div className="flex items-center pt-4 border-t border-gray-600">
                        <Avatar className={`h-12 w-12 bg-gray-700 text-white mr-4`}>
                          <AvatarFallback className="text-lg font-bold">
                            <img
                              src={card.picture.src}
                              alt={card.picture.alt}
                              className="w-full h-full object-cover bg-primary"
                            />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-black dark:text-white text-sm md:text-base">{card.author}</p>
                          <p className="text-black dark:text-white  text-xs md:text-sm">{card.role}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </figure>
              ))}
            </div>
            <div className="sticky top-0 h-screen grid place-content-center lg:text-left text-center hidden lg:grid">
              <div className="p-8 rounded-lg">
                <h1 className="text-4xl font-medium tracking-tight leading-[120%] text-gray-800 dark:text-white">
                  Message from <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-cyan-500">
                    PCIU Computer Club
                  </span>{' '}
                  <br />
                  Ambassadors
                  <span className="animate-bounce inline-block ml-1">🤗</span>
                </h1>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default QuoteCard;
