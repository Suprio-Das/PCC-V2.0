import { FaLaptopCode, FaBrain, FaPalette, FaRocket, FaCogs } from 'react-icons/fa';

interface Topic {
  name: string;
  count: number;
  icon: JSX.Element;
}

const topics: Topic[] = [
  { name: 'Tech', count: 12, icon: <FaLaptopCode className="text-2xl text-green-700" /> },
  { name: 'Programming', count: 8, icon: <FaCogs className="text-2xl text-green-700" /> },
  { name: 'AI', count: 5, icon: <FaBrain className="text-2xl text-green-700" /> },
  { name: 'Design', count: 7, icon: <FaPalette className="text-2xl text-green-700" /> },
  { name: 'Startup', count: 3, icon: <FaRocket className="text-2xl text-green-700" /> },
];

export const TrendingTopics = () => {
  return (
    <section className="mt-6 bg-green-50 w-11/12 mx-auto rounded-xl py-10 dark:bg-gray-800">
      {/* Advisor Panel Heading */}
      <div className="max-w-xs mx-auto bg-green-100 border border-green-400 rounded px-6 py-3 mb-14 flex justify-center items-center">
        <h3 className="font-semibold text-lg text-green-800 md:text-xl">Trending Topics</h3>
      </div>

      {/* Topics */}
      <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
        <div className="flex justify-around flex-wrap items-center gap-4">
          {topics.map((topic) => (
            <a key={topic.name} href="#" className="text-center flex flex-col items-center transition hover:scale-105">
              <div className="relative w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-green-100 transition">
                {topic.icon}
                <div className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {topic.count}
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800 dark:text-white">{topic.name}</p>
            </a>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="flex justify-center mt-6">
          <a href="#" className="join-pcc-btn">
            Explore All
          </a>
        </div>
      </div>
    </section>
  );
};
