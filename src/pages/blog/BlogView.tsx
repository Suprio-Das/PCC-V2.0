// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Bookmark, MessageSquare, Share2 } from 'lucide-react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa6';
// import CommentBox from '@/components/CommentBox';
// import { staticBlogs } from '@/components/BlogCard';

// interface Blog {
//   id: number;
//   title: string;
//   author: string;
//   date: string;
//   description: string;
//   thumbnail: string;
// }

// export const BlogView = () => {
//   const { blogId } = useParams();
//   const blog = staticBlogs.find((b) => b.id === Number(blogId));

//   const [liked, setLiked] = useState(false);
//   const [blogLike, setBlogLike] = useState(0);

//   useEffect(() => {
//     if (blog) {
//       setBlogLike(Math.floor(Math.random() * 100));
//     }
//     window.scrollTo(0, 0);
//   }, [blog]);

//   const handleLike = () => {
//     if (!liked) setBlogLike(blogLike + 1);
//     else setBlogLike(blogLike - 1);
//     setLiked(!liked);
//   };

//   const handleShare = () => {
//     if (blog) {
//       const blogUrl = `${window.location.origin}/blogs/${blog.id}`;
//       navigator.clipboard.writeText(blogUrl);
//       alert('Blog link copied!');
//     }
//   };

//   if (!blog) return <p className="text-center mt-20">Blog not found.</p>;

//   return (
//     <div className="pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <div className="max-w-5xl mx-auto p-6 sm:p-10">
//         {/* Blog Header */}
//         <h2 className="text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">{blog.title}</h2>
//         <div className="flex items-center gap-4 mb-8">
//           <Avatar className="w-12 h-12">
//             <AvatarFallback>{blog.author[0]}</AvatarFallback>
//           </Avatar>
//           <p className="text-gray-600 dark:text-gray-300">{blog.author}</p>
//           <span className="text-gray-500 dark:text-gray-400">• {blog.date}</span>
//         </div>

//         {/* Featured Image */}
//         <div className="mb-10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//           <img src={blog.thumbnail} alt={blog.title} className="w-full object-cover" />
//         </div>

//         {/* Blog Content */}
//         <div
//           className="prose prose-lg dark:prose-invert max-w-none mb-10"
//           dangerouslySetInnerHTML={{ __html: blog.description }}
//         />

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {['Tech', 'Productivity', 'Web'].map((tag) => (
//             <Badge
//               key={tag}
//               variant="secondary"
//               className="px-3 py-1 bg-[#e9f9ec] text-[#1b9c85] rounded-full text-xs cursor-pointer hover:bg-[#1b9c85] hover:text-white transition"
//             >
//               #{tag}
//             </Badge>
//           ))}
//         </div>

//         {/* Engagement Buttons */}
//         <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-10 shadow-sm">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" onClick={handleLike} className="flex items-center gap-2">
//               {liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
//               <span>{blogLike}</span>
//             </Button>
//             <Button variant="ghost" className="flex items-center gap-2">
//               <MessageSquare className="w-5 h-5" />
//               <span>8 Comments</span>
//             </Button>
//           </div>
//           <div className="flex gap-3">
//             <Button variant="ghost">
//               <Bookmark className="w-5 h-5" />
//             </Button>
//             <Button variant="ghost" onClick={handleShare}>
//               <Share2 className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>

//         {/* Comments Section */}
//         <CommentBox selectedBlog={blog} />
//       </div>
//     </div>
//   );
// };
