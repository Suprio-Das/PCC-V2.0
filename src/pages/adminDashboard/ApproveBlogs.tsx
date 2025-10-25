// src/pages/Admin/ApproveBlogs.tsx
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type Blog = {
  _id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

const ApproveBlogs = () => {
  const navigate = useNavigate();

  // Static blog data (for demo)
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      _id: '1',
      title: 'Understanding React Hooks',
      author: 'Jarin Tasnin',
      category: 'Web Development',
      date: '2025-10-21T10:00:00.000Z',
      status: 'Pending',
    },
    {
      _id: '2',
      title: 'Exploring Data Science with Python',
      author: 'Suprio Das',
      category: 'Machine Learning',
      date: '2025-10-18T12:30:00.000Z',
      status: 'Approved',
    },
    {
      _id: '3',
      title: 'AI in Modern Education',
      author: 'Anika Rahman',
      category: 'Artificial Intelligence',
      date: '2025-10-16T09:15:00.000Z',
      status: 'Rejected',
    },
  ]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleApprove = (id: string) => {
    setBlogs((prev) => prev.map((b) => (b._id === id ? { ...b, status: 'Approved' } : b)));
    toast.success('Blog approved successfully (static mode)');
  };

  const handleReject = (id: string) => {
    setBlogs((prev) => prev.map((b) => (b._id === id ? { ...b, status: 'Rejected' } : b)));
    toast.error('Blog rejected (static mode)');
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Approve Blogs</h1>

          {blogs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No blogs found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                  Review and approve or reject submitted blogs.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>{blog.category}</TableCell>
                      <TableCell>{formatDate(blog.date)}</TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${
                            blog.status === 'Approved'
                              ? 'text-green-600'
                              : blog.status === 'Rejected'
                                ? 'text-red-600'
                                : 'text-yellow-600'
                          }`}
                        >
                          {blog.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical className="cursor-pointer text-gray-600 dark:text-gray-300" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1">
                            <DropdownMenuItem onClick={() => navigate(`/blogs/${blog._id}`)} className="font-grotesk">
                              <Eye className="mr-2" /> View
                            </DropdownMenuItem>

                            {blog.status === 'Pending' && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleApprove(blog._id)}
                                  className="text-green-600 font-grotesk"
                                >
                                  <CheckCircle className="mr-2" /> Approve
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() => handleReject(blog._id)}
                                  className="text-red-500 font-grotesk"
                                >
                                  <XCircle className="mr-2" /> Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ApproveBlogs;
