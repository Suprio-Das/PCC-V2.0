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

const WriteBlog: React.FC = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle banner upload & preview
  const handleBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBanner(file);

      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const createBlogHandler = () => {
    if (!title || !category || !description || !banner) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success('Blog created successfully (static mode)');
      setLoading(false);

      // Reset form
      setTitle('');
      setCategory('');
      setDescription('');
      setBanner(null);
      setBannerPreview(null);

      // Redirect to blog list or blog view
      navigate('/user-dashboard/blogs');
    }, 1000); // simulate API call
  };

  return (
    <div className="pb-20 pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen sm:px-6 md:px-10">
      <Card className="max-w-4xl mx-auto p-6 md:p-8 space-y-8 shadow-lg dark:bg-gray-800 rounded-xl">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Create a New Blog</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Add all blog details to share your thoughts, tutorials, or stories.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 font-garamond">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select onValueChange={(val) => setCategory(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Artificial Intelligence</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Banner */}
          <div className="space-y-2">
            <Label>Banner</Label>
            <Input type="file" accept="image/*" onChange={handleBanner} />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 w-full h-auto max-h-56 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <JoditEditor ref={editor} value={description} onChange={setDescription} config={{ height: 300 }} />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={createBlogHandler}
              disabled={loading}
              className="flex items-center gap-2 join-pcc-btn"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Blog'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WriteBlog;
