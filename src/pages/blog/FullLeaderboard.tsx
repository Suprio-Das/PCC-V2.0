import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { FaCrown } from 'react-icons/fa6';
import api from '@/Services/api';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

type UserType = {
  position: number;
  name: string;
  totalBlogs: number;
  totalStars: number;
  profile: string;
};

export const FullLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 7;

  // Fetch leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/api/public/getleaderboard');
        setLeaderboardData(res.data.leaderboard || []);
      } catch (error) {
        toast.error('Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-700 dark:text-gray-300">
        Loading leaderboard...
      </div>
    );
  }

  if (leaderboardData.length < 3) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center text-xl text-gray-700 dark:text-gray-300">
          Not enough users to display the leaderboard.
        </div>
        <Footer />
      </>
    );
  }

  const sortedUsers = [...leaderboardData].sort((a, b) => b.totalBlogs - a.totalBlogs);

  const top3 = sortedUsers.slice(0, 3);

  const totalPages = Math.ceil((sortedUsers.length - 3) / perPage);

  const restUsers = sortedUsers.slice(3 + (currentPage - 1) * perPage, 3 + currentPage * perPage);

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-5xl mx-auto px-5">
          <h1 className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">🏆 Leaderboard</h1>

          {/* Top 3 */}
          <div className="relative flex justify-center items-end mb-16 space-x-14">
            {/* 2nd */}
            {top3[1] && (
              <div className="flex flex-col items-center transform translate-y-6">
                <FaCrown className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 text-[#C0C0C0]" />
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600">
                  <img src={top3[1].profile} alt={top3[1].name} className="w-full h-full object-cover" />
                </div>
                <span className="mt-1 font-bold text-gray-800 dark:text-gray-100 text-base">2</span>
                <p className="text-sm md:text-lg font-semibold font-garamond dark:text-gray-300 mt-1 hover:underline">
                  {top3[1].name}
                </p>
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-300 mt-1">Blogs: {top3[1].totalBlogs}</p>
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-300 mt-1">Stars: {top3[1].totalStars}</p>
              </div>
            )}

            {/* 1st */}
            {top3[0] && (
              <div className="flex flex-col items-center z-10">
                <FaCrown className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-12 h-12 text-[#FFD700]" />
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400">
                  <img src={top3[0].profile} alt={top3[0].name} className="w-full h-full object-cover" />
                </div>
                <span className="mt-1 font-bold text-gray-800 dark:text-gray-100 text-lg">1</span>
                <p className="text-sm md:text-lg font-semibold font-garamond dark:text-gray-300 mt-1 hover:underline">
                  {top3[0].name}
                </p>
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-300 mt-1">Blogs: {top3[0].totalBlogs}</p>
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-300 mt-1">Stars: {top3[0].totalStars}</p>
              </div>
            )}

            {/* 3rd */}
            {top3[2] && (
              <div className="flex flex-col items-center transform translate-y-6">
                <FaCrown className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 text-[#CD7F32]" />
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#CD7F32] dark:border-[#CD7F32]">
                  <img src={top3[2].profile} alt={top3[2].name} className="w-full h-full object-cover" />
                </div>
                <span className="mt-1 font-bold text-gray-800 dark:text-gray-100 text-base">3</span>
                <p className="text-sm md:text-lg font-semibold font-garamond dark:text-gray-300 mt-1 hover:underline">
                  {top3[2].name}
                </p>
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-300 mt-1">Blogs: {top3[2].totalBlogs}</p>
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-300 mt-1">Stars: {top3[2].totalStars}</p>
              </div>
            )}
          </div>

          {/* Rest Users */}
          <div className="space-y-4">
            {restUsers.map((user, idx) => (
              <div
                key={user.position}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#f3faf4] dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-transform transform hover:scale-105 shadow-md"
              >
                <span className="font-bold text-green-600 dark:text-green-400 w-6">
                  {idx + 4 + (currentPage - 1) * perPage}
                </span>

                <img
                  src={user.profile}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-green-500 object-cover transition-transform duration-300 hover:scale-110"
                />

                <div>
                  <p className="font-medium font-garamond text-lg text-gray-800 dark:text-gray-100 hover:underline">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.totalBlogs} blogs • {user.totalStars} stars
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button onClick={handlePrev} disabled={currentPage === 1} className="disabled:opacity-40 join-pcc-btn">
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
              className="disabled:opacity-40 join-pcc-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Toaster richColors />
      <Footer />
    </>
  );
};
