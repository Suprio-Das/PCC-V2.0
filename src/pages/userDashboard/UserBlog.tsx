import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import api from '@/Services/api';
import { RootState } from '@/Redux/Store';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

type Blog = {
  _id: string;
  title: string;
  category: string;
  thumbnail: string;
  createdAt: string;
};
interface UserType {
  userId: string;
}
const UserBlog: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.Auth.user) as UserType | null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      setLoading(true);
      const res = await api.get(`/api/student/getpublishedblogs/${userId}`);
      if (res.data.blogs.length !== 0) {
        setBlogs(res.data.blogs);
        setLoading(false);
      }
    };
    fetchPublishedBlogs();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const deleteBlog = (id: string) => {
    toast('Deleted blog with id: ' + id);
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Your Blogs</h1>
          {loading ? (
            <div className="py-10 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-300" />
            </div>
          ) : blogs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">
              No blogs found. Start creating your first blog!
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">A list of your recent blogs.</TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((item) => (
                    <TableRow key={item._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <TableCell className="flex gap-4 items-center py-3">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-16 h-16 rounded-lg shadow-sm hidden md:block object-cover"
                        />
                        <h2
                          className="hover:underline font-semibold text-gray-800 dark:text-gray-100 cursor-pointer font-grotesk"
                          onClick={() => navigate(`/blogs/${item._id}`)}
                        >
                          {item.title}
                        </h2>
                      </TableCell>
                      <TableCell>
                        <span className="py-1 text-sm rounded-lg">{item.category}</span>
                      </TableCell>
                      <TableCell>
                        <span className=" py-1 text-sm rounded-lg">{formatDate(item.createdAt)}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical className="cursor-pointer text-gray-600 dark:text-gray-300" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1">
                            <DropdownMenuItem
                              className="font-grotesk"
                              onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}
                            >
                              <Edit className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 font-grotesk"
                              onClick={() => deleteBlog(item._id)}
                            >
                              <Trash2 className="mr-2" /> Delete
                            </DropdownMenuItem>
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

export default UserBlog;
