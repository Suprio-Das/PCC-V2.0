import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { Loader2, Share2 } from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import userLogo from '@/assets/user.jpg';
import api from '@/Services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export interface Blog {
  _id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  name: string;
  profile: string;
  description: string;
  star: number;
  starsBy: string[];
}

interface UserType {
  userId: string;
}

export default function BlogViewStatic() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.Auth.user) as UserType | null;
  const userId = user?.userId;

  const userHasStarred = blog?.starsBy.includes(userId || '') || false;

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/public/getsingleblog/${id}`);
        if (res.data.success) {
          setBlog(res.data.blogObj);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleStar = async () => {
    if (!blog || userHasStarred || !userId) return;

    try {
      const res = await api.put(`/api/student/star/${id}`, { userId });

      if (res.data.success) {
        setBlog((prev) =>
          prev
            ? {
                ...prev,
                star: res.data.stars,
                starsBy: [...prev.starsBy, userId],
              }
            : prev,
        );
      }
    } catch (error) {
      toast.error('Error occured while starring.');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard && blog) {
      navigator.clipboard.writeText(`${window.location.origin}/blogs/${blog._id}`);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  if (!blog) return null;

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-gray-600 dark:text-gray-300" />
          </div>
        ) : (
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

            {/* Title + Author */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
                {blog.title}
              </h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 rounded-full">
                    <AvatarImage src={blog.profile || userLogo} />
                    <AvatarFallback>{blog.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium font-garamond text-gray-900 dark:text-gray-100">{blog.name}</p>
                  </div>
                </div>
                <p className="text-base font-garamond">Published on {formatDate(blog.createdAt)}</p>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="mb-10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={blog.thumbnail} alt={blog.title} className="w-full object-cover max-h-[450px]" />
            </div>

            {/* Content */}
            <div
              className="prose prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none mb-10"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />

            {/* Engagement bar */}
            <div className="flex flex-wrap items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-10 shadow-sm">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleStar}
                  variant="ghost"
                  className="flex items-center gap-2"
                  disabled={userHasStarred}
                >
                  {userHasStarred ? (
                    <FaStar className="text-yellow-500 size-4" />
                  ) : (
                    <FaRegStar className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 size-4" />
                  )}
                  <span>{blog.star}</span>
                </Button>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <Toaster richColors />
    </>
  );
}
