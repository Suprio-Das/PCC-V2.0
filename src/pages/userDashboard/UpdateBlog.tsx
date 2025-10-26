import { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface BlogData {
  title: string;
  subtitle: string;
  category: string;
  thumbnail: string | File | null;
}

const UpdateBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.blogId;

  const staticBlog = {
    _id: '1',
    title: 'How AI is Transforming Linguistics Research',
    subtitle: 'Exploring the intersection of technology and language',
    description: '<p>Artificial intelligence is reshaping how we analyze and understand human languages...</p>',
    category: 'AI & Linguistics',
    thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
    isPublished: true,
  };

  const [blogData, setBlogData] = useState<BlogData>({
    title: staticBlog.title,
    subtitle: staticBlog.subtitle,
    category: staticBlog.category,
    thumbnail: staticBlog.thumbnail,
  });
  const [content, setContent] = useState(staticBlog.description);
  const [previewThumbnail, setPreviewThumbnail] = useState<string>(staticBlog.thumbnail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchBlogById(id);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCategory = (value: string) => {
    setBlogData((prev) => ({ ...prev, category: value }));
  };

  const selectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    try {
      setLoading(true);
      // Simulate success
      setTimeout(() => {
        toast.success('Blog updated successfully (demo)');
        setLoading(false);
      }, 1200);
    } catch (error) {
      toast.error('Update failed!');
      setLoading(false);
    }
  };

  const togglePublishUnpublish = (action: boolean) => {
    toast.success(`Blog ${action ? 'published' : 'unpublished'} (demo)`);
  };

  const deleteBlog = () => {
    toast.success('Blog deleted (demo)');
    navigate('/user-dashboard/your-blog');
  };

  return (
    <div className="pb-10 px-3 pt-20 md:pr-20 md:pl-[320px] bg-gray-50 dark:bg-gray-900 min-h-screen font-grotesk">
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
          {/* Header */}
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Update Blog</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm pt-2">
              Make changes to your blog and click save or publish.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              className="rounded-full border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white px-6 py-2 hover:opacity-90 transition dark:hover:text-black"
              onClick={() => togglePublishUnpublish(!staticBlog.isPublished)}
            >
              {staticBlog.isPublished ? 'Unpublish' : 'Publish'}
            </Button>

            <Button
              variant="destructive"
              className="rounded-full border-[0.5px] border-red-600 bg-[#f2d9d9] shadow-none text-black hover:text-white px-6 py-2 hover:opacity-90 transition"
              onClick={deleteBlog}
            >
              Delete Blog
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="dark:border-gray-400 focus:ring-2 focus:ring-green-400 mt-2"
              />
            </div>

            <div>
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subtitle"
                value={blogData.subtitle}
                onChange={handleChange}
                placeholder="Enter subtitle"
                className="dark:border-gray-400 focus:ring-2 focus:ring-green-400 mt-2"
              />
            </div>

            <div>
              <Label>Description</Label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
                config={{ height: 400 }}
                className="rounded-lg border dark:border-gray-400 mt-2 dark:text-black"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-full md:w-64 mt-2">
                  <SelectValue placeholder={blogData.category || 'Select a category'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    <SelectItem value="Blogging">Blogging</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Cooking">Cooking</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Thumbnail</Label>
              <Input
                type="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="w-fit dark:border-gray-400 mt-2"
              />
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="Thumbnail Preview"
                  className="w-64 h-40 object-cover rounded-lg mt-2"
                />
              )}
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="rounded-full border-[0.5px] border-black shadow-none text-black hover:text-black dark:text-white px-6 py-2 hover:opacity-90 transition"
            >
              Back
            </Button>
            <Button
              onClick={updateBlogHandler}
              className="rounded-full border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white dark:hover:text-black px-6 py-2 hover:opacity-90 transition"
            >
              {loading ? 'Please Wait...' : 'Save'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
