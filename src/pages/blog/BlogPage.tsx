import { Navbar } from '@/components/Navbar';
import { BlogCard, staticBlogs } from '../../pages/blog/BlogCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

const tags = ['Blogging', 'Web Development', 'Programming', 'AI', 'Photography', 'Sports'];
const suggestedBlogs = [
  'The Rise of Modern Web Development',
  'Exploring the Future of Artificial Intelligence',
  'Mindful Living in a Busy World',
];

export const BlogPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg md:text-xl   drop-shadow-md bg-gradient-to-r from-primary to-black dark:to-white text-transparent bg-clip-text uppercase">
              — BLOGS —
            </p>
            <p className="mt-6 text-gray-900 dark:text-gray-200 text-base max-w-2xl mx-auto leading-relaxed font-poppins">
              Explore our latest insights, tutorials, and stories from the world of technology, creativity, and
              innovation.
            </p>
          </motion.div>
        </section>
        {/* Blog Section */}
        <h3 className="font-semibold text-3xl text-black md:text-4xl text-center my-5 dark:text-white">Latest Blogs</h3>
        <section className="">
          <div className="w-11/12 mx-auto md:px-16 px-5 md:pt-16 pt-5 md:pb-24 pb-5 mb-5 rounded-xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Blog Cards */}
              <div className="lg:col-span-2 space-y-6">
                {staticBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Right Side - Sidebar */}
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 space-y-8 transition-colors duration-300">
                {/* Categories */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Popular Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#e9f9ec] text-green-600 rounded-full text-sm cursor-pointer 
                               hover:bg-green-600 hover:text-white transition-colors duration-300 dark:bg-gray-700 dark:text-green-400 dark:hover:bg-green-500 dark:hover:text-white"
                        onClick={() => navigate(`/search?q=${cat}`)}
                      >
                        #{cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subscribe Newsletter */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Subscribe to Newsletter
                  </h2>
                  <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 flex-col sm:flex-row">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-[#1b9c85] flex-1 
                             bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      required
                    />
                    <button type="submit" className="join-pcc-btn">
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Suggested Blogs */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Suggested Blogs</h2>
                  <ul className="space-y-2">
                    {suggestedBlogs.map((title, idx) => (
                      <li
                        key={idx}
                        className="text-green-600 cursor-pointer hover:underline font-grotesk text-sm dark:text-green-400 dark:hover:text-green-300"
                      >
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};
