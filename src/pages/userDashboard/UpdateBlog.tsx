import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import JoditEditor from 'jodit-react';

interface BlogData {
  title: string;
  subtitle: string;
  category: string;
  thumbnail: string | File | null;
}

const UpdateBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate();

  // Static blog data for demo
  const staticBlog = {
    _id: '1',
    title: 'How AI is Transforming Linguistics Research',
    subtitle: 'Exploring the intersection of technology and language',
    description: '<p>Artificial intelligence is reshaping how we analyze and understand human languages...</p>',
    category: 'AI & Linguistics',
    thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
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
    if (!blogData.title || !blogData.category || !content) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success('Blog updated successfully (demo)');
      setLoading(false);
      navigate('/user-dashboard/blogs');
    }, 1200);
  };

  return (
    <div className="pb-20 pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen sm:px-6 md:px-10">
      <Card className="w-full max-w-4xl mx-auto p-8 space-y-10 shadow-lg dark:bg-gray-800 rounded-xl">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Update Blog</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm pt-2">Modify your blog details below.</p>
        </div>

        <div className="space-y-4 font-garamond">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input name="title" value={blogData.title} onChange={handleChange} placeholder="Blog title" />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select onValueChange={selectCategory} value={blogData.category}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select category" />
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

          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <Input type="file" accept="image/*" onChange={selectThumbnail} />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail Preview"
                className="mt-2 w-full h-auto max-h-56 object-cover rounded-lg border"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <JoditEditor ref={editor} value={content} onChange={setContent} config={{ height: 300 }} />
          </div>

          <div className="flex justify-end">
            <Button onClick={updateBlogHandler} disabled={loading} className="flex items-center gap-2 join-pcc-btn">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update Blog'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateBlog;
