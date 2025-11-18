import { Navbar } from '@/components/Navbar';
import { BlogCard } from '../../pages/blog/BlogCard';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import api from '@/Services/api';
import { Loader2 } from 'lucide-react';

export const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [leaderLoading, setLeaderLoading] = useState(true);

  // Pagination
  const blogsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/api/public/getblogs');
        if (res.data.success) {
          setBlogs(res.data.allBlogs);
        }
      } catch (err) {
        toast.error('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/api/public/getleaderboard');
        if (res.data.success) {
          const sorted = [...res.data.leaderboard].sort((a, b) => b.totalStars - a.totalStars);
          setLeaderboard(sorted);
        }
      } catch (err) {
        toast.error('Failed to fetch leaderboard');
      } finally {
        setLeaderLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const currentBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const goToPage = (pageNum: number) => setCurrentPage(pageNum);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

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
            <div className="px-4">
              <p className="text-lg md:text-xl text-white uppercase">— BLOGS —</p>
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
              {/* Left - Blogs */}
              <div className="lg:col-span-2 space-y-6">
                {loading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-10 w-10 animate-spin text-gray-600 dark:text-gray-300" />
                  </div>
                ) : currentBlogs.length === 0 ? (
                  <p className="text-center text-white">No blogs found.</p>
                ) : (
                  currentBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                )}

                {/* Pagination */}
                {currentBlogs.length > 0 && (
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
                      className="join-pcc-btn disabled:opacity-40 dark:text-white"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>

              {/* Right - Leaderboard */}
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">🏆 Top Bloggers</h2>

                {leaderLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-300" />
                  </div>
                ) : leaderboard.length < 3 ? (
                  <p className="text-gray-500 dark:text-gray-300">Not enough bloggers to show leaderboard.</p>
                ) : (
                  <div className="space-y-4">
                    {leaderboard.slice(0, 8).map((user, idx) => (
                      <div
                        key={user.position}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#f3faf4] dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-green-600 dark:text-green-400 w-6">{idx + 1}.</span>

                          <img
                            src={user.profile}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
                          />

                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-100">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {user.totalBlogs} blogs • {user.totalStars} stars
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {leaderboard.length >= 3 && (
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
      <Toaster richColors />
    </>
  );
};
