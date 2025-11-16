import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2 } from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import userLogo from '@/assets/user.jpg';

export interface Blog {
  _id: string;
  title: string;
  subtitle?: string;
  thumbnail: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
    photoUrl?: string;
  };
  description: string;
  likes: number;
  commentsCount: number;
  tags?: string[];
}

export default function BlogViewStatic() {
  const [star, setStar] = useState(false);
  const [blogStar, setBlogStar] = useState(128);

  const blog = {
    _id: 'static-1',
    title: 'How to Build a Modern Web App in 2025',
    subtitle: 'A complete guide for beginners and professionals.',
    thumbnail: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1600',
    createdAt: '2025-03-12T09:30:00Z',
    author: {
      firstName: 'John',
      lastName: 'Doe',
      photoUrl: '',
    },
    description: `
      <p>Building a modern <strong>web application</strong> in 2025 is faster and more enjoyable thanks to modern tools, component libraries and AI-assisted workflows.</p>
      <p>This article walks through the recommended stack, patterns and deployment tips you can use today.</p>
      <h3>Key Points</h3>
      <ul>
        <li>Use composable UI components</li>
        <li>Automate testing and CI/CD</li>
        <li>Prioritise accessibility</li>
      </ul>
      <p>Follow these steps and you'll ship reliable products faster.</p>
    `,
    stars: 128,
  };

  const handleStar = () => {
    setStar(!star);
    setBlogStar((s) => (star ? s - 1 : s + 1));
  };

  const handleShare = () => {
    // static placeholder
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/blogs/${blog._id}`);
      alert('Link copied to clipboard (static)');
    } else alert('Share not supported (static)');
  };

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <>
      <Navbar />

      <div className="pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6 text-gray-500 dark:text-gray-400 font-poppins">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/">
                  <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/blogs">
                  <BreadcrumbLink>Blogs</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blog.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title + Author Row */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white ">
              {blog.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={blog.author.photoUrl || userLogo} />
                  <AvatarFallback>
                    {blog.author.firstName[0]}
                    {blog.author.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium font-garamond text-gray-900 dark:text-gray-100">
                    {blog.author.firstName} {blog.author.lastName}
                  </p>
                </div>
              </div>

              <p className="text-base font-garamond">Published on {formatDate(blog.createdAt)}</p>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="mb-10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={blog.thumbnail} alt={blog.title} className="w-full object-cover max-h-[450px]" />
            {blog.subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic px-2 font-garamond">{blog.subtitle}</p>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Blogging', 'Productivity', 'TechTrends'].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 bg-[#e9f9ec] text-green-600 rounded-full text-xs cursor-pointer hover:bg-green-500 hover:text-white transition"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Engagement bar */}
          <div className="flex flex-wrap items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-10 shadow-sm">
            <div className="flex items-center gap-4">
              <Button onClick={handleStar} variant="ghost" className="flex items-center gap-2">
                {star ? (
                  <FaStar className="text-yellow-500 size-4" />
                ) : (
                  <FaRegStar className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 size-4" />
                )}
                <span>{blogStar}</span>
              </Button>
            </div>

            <div className="flex gap-3">
              {/* <Button variant="ghost">
                <Bookmark className="w-5 h-5" />
              </Button> */}
              <Button variant="ghost" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
