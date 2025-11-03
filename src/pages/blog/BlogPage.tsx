import { Navbar } from '@/components/Navbar';
import { BlogCard, staticBlogs } from '../../pages/blog/BlogCard';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy Leaderboard Data
const leaderboardData = [
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

export const BlogPage = () => {
  const navigate = useNavigate();

  // Pagination
  const blogsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(staticBlogs.length / blogsPerPage);

  // Slice current page blogs only
  const currentBlogs = staticBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const goToPage = (pageNum: number) => setCurrentPage(pageNum);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Leaderboard sorted by totalBlogs
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.totalBlogs - a.totalBlogs);
  const topLeaderboard = sortedLeaderboard.slice(0, 8);

  return (
    <>
      <Navbar />
      <div>
        {/* Hero Section */}
        <section
          className="relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center"
          style={{
            backgroundImage: "url('https://demo.graygrids.com/themes/eventgrids/assets/images/hero/hero-bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-green-600/70 via-green-700/70 to-green-900/70"></div>
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative z-10 px-4">
              <p className="text-lg md:text-xl drop-shadow-md text-white uppercase">— BLOGS —</p>
              <p className="mt-6 text-white text-base max-w-2xl mx-auto leading-relaxed font-poppins">
                Explore our latest insights, tutorials, and stories from the world of technology, creativity, and
                innovation.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Blog Section */}
        <h3 className="font-semibold text-3xl text-black md:text-4xl text-center my-5 dark:text-white">Blogs</h3>
        <section>
          <div className="w-11/12 mx-auto md:px-16 px-5 md:pt-16 pt-5 md:pb-24 pb-5 mb-5 rounded-xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Blog Cards */}
              <div className="lg:col-span-2 space-y-6">
                {currentBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}

                {/* Pagination Buttons */}
                <div className="flex justify-center items-center gap-3 mt-8">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="join-pcc-btn disabled:opacity-40 dark:text-white"
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
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
                    className="disabled:opacity-40 join-pcc-btn dark:text-white"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Right Side - Leaderboard */}
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition-colors duration-300">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">🏆 Top Bloggers</h2>
                <div className="space-y-4">
                  {topLeaderboard.map((user, idx) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#f3faf4] dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-green-600 dark:text-green-400 w-6">{idx + 1}.</span>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">{user.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.totalBlogs} blogs • {user.totalLikes} likes
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {leaderboardData.length > 6 && (
                  <button onClick={() => navigate('/leaderboard')} className="mt-4 w-full text-white join-pcc-btn">
                    View Full Leaderboard
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
