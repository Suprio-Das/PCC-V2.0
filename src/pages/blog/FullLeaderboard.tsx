import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { FaCrown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

type UserType = {
  id: number;
  name: string;
  totalBlogs: number;
  totalLikes: number;
  avatar: string;
};

// Dummy leaderboard data
const leaderboardData: UserType[] = [
  {
    id: 1,
    name: 'Jarin Tasnin Anika',
    totalBlogs: 15,
    totalLikes: 230,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Suprio Das',
    totalBlogs: 12,
    totalLikes: 180,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Arif Hossain',
    totalBlogs: 10,
    totalLikes: 140,
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 4,
    name: 'Sabrina Khan',
    totalBlogs: 9,
    totalLikes: 120,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 5,
    name: 'Rafiq Ahmed',
    totalBlogs: 8,
    totalLikes: 110,
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
  },
  {
    id: 6,
    name: 'Tania Rahman',
    totalBlogs: 7,
    totalLikes: 95,
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    id: 7,
    name: 'Imran Hossain',
    totalBlogs: 6,
    totalLikes: 85,
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
  },
  {
    id: 8,
    name: 'Imran Hossain',
    totalBlogs: 6,
    totalLikes: 85,
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
  },
  {
    id: 9,
    name: 'Imran Hossain',
    totalBlogs: 6,
    totalLikes: 85,
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
  },
  {
    id: 10,
    name: 'Imran Hossain',
    totalBlogs: 6,
    totalLikes: 85,
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
  },
];

export const FullLeaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(leaderboardData.length / perPage);

  const sortedUsers = [...leaderboardData].sort((a, b) => b.totalBlogs - a.totalBlogs);

  // Top 3 for special display
  const top3 = sortedUsers.slice(0, 3);

  // Rest users for normal table
  const restUsers = sortedUsers.slice(3 + (currentPage - 1) * perPage, 3 + currentPage * perPage);

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-5xl mx-auto px-5">
          <h1 className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">🏆 Leaderboard</h1>

          {/* Top 3 users */}
          <div className="relative flex justify-center items-end mb-16 space-x-14">
            {/* 2nd */}
            {top3[1] && (
              <div className="flex flex-col items-center transform translate-y-6">
                <FaCrown className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 text-[#C0C0C0]" />
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600">
                  <img src={top3[1].avatar} alt={top3[1].name} className="w-full h-full object-cover" />
                </div>
                <span className="mt-1 font-bold text-gray-800 dark:text-gray-100 text-base">2</span>
                <Link to={`/profile/${top3[1].id}`}>
                  <p className="text-lg font-semibold font-garamond dark:text-gray-300 mt-1 hover:underline">
                    {top3[1].name}
                  </p>
                </Link>
                <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">Blogs: {top3[1].totalBlogs}</p>
                <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">Likes: {top3[1].totalLikes}</p>
              </div>
            )}

            {/* 1st */}
            {top3[0] && (
              <div className="flex flex-col items-center z-10">
                <FaCrown className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-12 h-12 text-[#FFD700]" />
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400">
                  <img src={top3[0].avatar} alt={top3[0].name} className="w-full h-full object-cover" />
                </div>
                <span className="mt-1 font-bold text-gray-800 dark:text-gray-100 text-lg">1</span>
                <Link to={`/profile/${top3[0].id}`}>
                  <p className="text-lg font-semibold font-garamond dark:text-gray-300 mt-1 hover:underline">
                    {top3[0].name}
                  </p>
                </Link>
                <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">Blogs: {top3[0].totalBlogs}</p>
                <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">Likes: {top3[0].totalLikes}</p>
              </div>
            )}

            {/* 3rd */}
            {top3[2] && (
              <div className="flex flex-col items-center transform translate-y-6">
                <FaCrown className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 text-[#CD7F32]" />
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#CD7F32] dark:border-[#CD7F32]">
                  <img src={top3[2].avatar} alt={top3[2].name} className="w-full h-full object-cover" />
                  {/* Bronze Crown */}
                </div>
                <span className="mt-1 font-bold text-gray-800 dark:text-gray-100 text-base">3</span>
                <Link to={`/profile/${top3[2].id}`}>
                  {' '}
                  <p className="text-lg font-semibold font-garamond dark:text-gray-300 mt-1 hover:underline">
                    {top3[2].name}
                  </p>
                </Link>
                <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">Blogs: {top3[2].totalBlogs}</p>
                <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">Likes: {top3[2].totalLikes}</p>
              </div>
            )}
          </div>

          {/* Rest users table */}
          <div className="space-y-4">
            {restUsers.map((user, idx) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#f3faf4] dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-transform transform hover:scale-105 shadow-md"
              >
                {/* Rank */}
                <span className="font-bold text-green-600 dark:text-green-400 w-6">
                  {idx + 4 + (currentPage - 1) * perPage}
                </span>

                {/* Avatar */}
                <Link to={`/profile/${user.id}`}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-green-500 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </Link>

                {/* Name + Stats */}
                <div>
                  <Link to={`/profile/${user.id}`}>
                    <p className="font-medium font-garamond text-lg text-gray-800 dark:text-gray-100 hover:underline">
                      {user.name}
                    </p>
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.totalBlogs} blogs • {user.totalLikes} likes
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button onClick={handlePrev} disabled={currentPage === 1} className=" disabled:opacity-40 join-pcc-btn">
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === i + 1
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-gray-600'
                } transition`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className=" disabled:opacity-40 join-pcc-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
