import { useNavigate } from 'react-router-dom';

interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  thumbnail: string;
}

export const staticBlogs: Blog[] = [
  {
    id: 1,
    title: 'The Future of Modern Web Development',
    author: 'John Doe',
    date: 'October 18, 2025',
    description:
      'Web development is constantly evolving with frameworks like React, Next.js, and Svelte transforming the developer experience. Here’s what the next era holds...',
    thumbnail: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Exploring the Role of AI in Everyday Life',
    author: 'Jane Smith',
    date: 'October 12, 2025',
    description:
      'From smart homes to AI-driven healthcare, artificial intelligence is reshaping our daily lives. Let’s explore the ethical and social implications...',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Mindful Living in a Hyperconnected World',
    author: 'Rafiul Hasan',
    date: 'October 5, 2025',
    description:
      'Digital overload is real. Practicing mindfulness can help you stay grounded amidst constant notifications and screen time...',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Tips to Boost Your Digital Marketing Strategy',
    author: 'Emily Davis',
    date: 'September 29, 2025',
    description:
      'Effective digital marketing involves more than just ads. From SEO to social engagement — discover how to craft impactful strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Tips to Boost Your Digital Marketing Strategy',
    author: 'Emily Davis',
    date: 'September 29, 2025',
    description:
      'Effective digital marketing involves more than just ads. From SEO to social engagement — discover how to craft impactful strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Tips to Boost Your Digital Marketing Strategy',
    author: 'Emily Davis',
    date: 'September 29, 2025',
    description:
      'Effective digital marketing involves more than just ads. From SEO to social engagement — discover how to craft impactful strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Tips to Boost Your Digital Marketing Strategy',
    author: 'Emily Davis',
    date: 'September 29, 2025',
    description:
      'Effective digital marketing involves more than just ads. From SEO to social engagement — discover how to craft impactful strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Tips to Boost Your Digital Marketing Strategy',
    author: 'Emily Davis',
    date: 'September 29, 2025',
    description:
      'Effective digital marketing involves more than just ads. From SEO to social engagement — discover how to craft impactful strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'Tips to Boost Your Digital Marketing Strategy',
    author: 'Emily Davis',
    date: 'September 29, 2025',
    description:
      'Effective digital marketing involves more than just ads. From SEO to social engagement — discover how to craft impactful strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
  },
];

export const BlogCard = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();

  return (
    <div className="border border-green-200 bg-[#f3f8f4] dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row md:h-40">
      {/* Image Left */}
      <img src={blog.thumbnail} alt={blog.title} className="w-full md:w-1/3 md:h-full object-cover p-5 rounded-lg" />

      {/* Text Right */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{blog.title}</h2>
          <p className="text-gray-500 dark:text-gray-300 text-xs mb-2">
            By <span className="font-medium text-[#1b9c85] dark:text-green-400">{blog.author}</span> • {blog.date}
          </p>
          <p className="text-gray-700 dark:text-gray-200 text-xs line-clamp-2">{blog.description.slice(0, 150)}...</p>
        </div>
        <button
          onClick={() => navigate(`/blogs/${blog.id}`)}
          className="text-[#1b9c85] dark:text-green-400 text-sm font-semibold hover:underline self-start"
        >
          Read More
        </button>
      </div>
    </div>
  );
};
