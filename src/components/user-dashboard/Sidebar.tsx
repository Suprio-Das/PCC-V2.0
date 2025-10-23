import { useState } from 'react';
import { ChartBar, UserRound, MessageSquare, PencilLine } from 'lucide-react';
import { FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      path: '/dashboard/profile',
      label: 'Profile',
      icon: <UserRound size={22} />,
    },
    {
      path: '/dashboard/your-blog',
      label: 'Your Blogs',
      icon: <ChartBar size={22} />,
    },
    {
      path: '/dashboard/likes',
      label: 'Likes',
      icon: <FaHeart size={20} className="text-red-600" />,
    },
    {
      path: '/dashboard/comments',
      label: 'Comments',
      icon: <MessageSquare size={22} />,
    },
    {
      path: '/dashboard/write-blog',
      label: 'Write Blog',
      icon: <PencilLine size={22} />,
    },
  ];

  return (
    <div
      className={`hidden fixed top-20 left-0 h-screen md:block transition-all duration-300 border-r dark:border-gray-700 border-gray-200 bg-white dark:bg-gray-900 shadow-lg z-20 font-alegreya
      ${isCollapsed ? 'w-20' : 'w-[260px]'}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-6 bg-gray-200 dark:bg-gray-700 p-1 rounded-full shadow-md"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Menu */}
      <nav className="flex flex-col gap-2 mt-20 px-4">
        {menuItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center group gap-3 px-4 py-2 rounded-lg mx-2 transition-all duration-300 ${
                isCollapsed ? 'justify-center' : 'gap-3'
              } px-4 py-3 rounded-xl font-medium transition-all duration-200
               ${
                 isActive
                   ? 'bg-[#bfeac4] text-black dark:bg-[#d8f0db]'
                   : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
               }`
            }
          >
            <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{icon}</span>
            {!isCollapsed && (
              <span className="font-medium transition-all duration-300 group-hover:translate-x-1">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
