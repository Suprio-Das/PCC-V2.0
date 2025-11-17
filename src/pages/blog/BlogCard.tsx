import { useNavigate } from 'react-router-dom';

export interface Blog {
  id: string;
  title: string;
  name: string;
  author?: string;
  createdAt?: string;
  description: string;
  thumbnail: string;
}

export const BlogCard = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(blog.createdAt || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = blog.description;
  const plainText = tempDiv.textContent || tempDiv.innerText || '';
  const previewText = plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText;

  return (
    <div className="border border-green-200 bg-[#f3f8f4] dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row md:h-40">
      {/* Image Left */}
      <img src={blog.thumbnail} alt={blog.title} className="w-full md:w-1/3 md:h-full object-cover p-5 rounded-lg" />

      {/* Text Right */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{blog.title}</h2>
          <p className="text-gray-500 dark:text-gray-300 text-xs mb-2">
            By <span className="font-medium text-[#1b9c85] dark:text-green-400">{blog.name || blog.author}</span> •{' '}
            {formattedDate}
          </p>
          <p className="text-gray-700 dark:text-gray-200 text-xs line-clamp-2">{previewText}</p>
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
