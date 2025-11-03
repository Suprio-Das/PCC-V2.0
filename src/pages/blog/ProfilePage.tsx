import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const navigate = useNavigate();

  // Static user data
  const user = {
    id: 'CSE 02807555',
    name: 'Jarin Tasnin Anika',
    batch: 'CSE-28',
    totalBlogs: 15,
    totalLikes: 230,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    blogs: [
      {
        id: 1,
        title: 'The Future of Modern Web Development',
        date: 'October 18, 2025',
        author: 'Jarin Tasnin Anika',
        description:
          'Web development is constantly evolving with frameworks like React, Next.js, and Svelte transforming the developer experience. Here’s what the next era holds...',
        thumbnail: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 2,
        title: 'Exploring the Role of AI in Everyday Life',
        date: 'October 12, 2025',
        author: 'Jarin Tasnin Anika',
        description:
          'From smart homes to AI-driven healthcare, artificial intelligence is reshaping our daily lives. Let’s explore the ethical and social implications...',
        thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 3,
        title: 'Mindful Living in a Hyperconnected World',
        date: 'October 5, 2025',
        author: 'Jarin Tasnin Anika',
        description:
          'Digital overload is real. Practicing mindfulness can help you stay grounded amidst constant notifications and screen time...',
        thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 4,
        title: 'Tips to Boost Your Digital Marketing Strategy',
        date: 'September 29, 2025',
        author: 'Jarin Tasnin Anika',
        description:
          'Effective digital marketing involves more than just ads. From SEO to social engagement — discover how to craft impactful strategies.',
        thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 5,
        title: 'The Rise of Ethical AI',
        date: 'September 20, 2025',
        author: 'Jarin Tasnin Anika',
        description:
          'As AI continues to advance, the importance of ethics and transparency in algorithmic decision-making becomes more crucial than ever.',
        thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
      },
    ],
  };

  // Pagination setup
  const blogsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(user.blogs.length / blogsPerPage);

  // Slice current page blogs only
  const currentBlogs = user.blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const goToPage = (pageNum: number) => setCurrentPage(pageNum);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Navbar />

      {/* Profile Header */}
      <div className=" dark:bg-gray-800 py-10">
        <div className="bg-green-50 rounded-xl py-20 max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-8">
          {/* Left: Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border-2 border-green-500 shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{user.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-semibold">ID:</span> {user.id}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-semibold">Batch:</span> {user.batch}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-semibold">Total Blogs:</span> {user.totalBlogs}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Total Likes:</span> {user.totalLikes}
            </p>
          </div>
        </div>
      </div>

      {/* User Blogs */}
      <div className="max-w-7xl mx-auto px-6 mt-10 mb-20">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          📝 {`${user.name.split(' ')[0]}'s Blogs`}
        </h3>

        {user.blogs.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 gap-6">
              {currentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border border-green-200 bg-[#f3f8f4] dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row md:h-40"
                >
                  {/* Image Left */}
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full md:w-1/3 md:h-full object-cover p-4 rounded-lg"
                  />

                  {/* Text Right */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{blog.title}</h2>
                      <p className="text-gray-500 dark:text-gray-300 text-xs mb-2">
                        By <span className="font-medium text-[#1b9c85] dark:text-green-400">{blog.author}</span> •{' '}
                        {blog.date}
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 text-xs line-clamp-2">
                        {blog.description.slice(0, 150)}...
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/blogs/${blog.id}`)}
                      className="text-[#1b9c85] dark:text-green-400 text-sm font-semibold hover:underline self-start"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
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
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No blogs found for this user.</p>
        )}
      </div>

      <Footer />
    </>
  );
};
