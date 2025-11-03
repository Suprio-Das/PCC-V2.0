import { useState } from 'react';
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
import api from '@/Services/api';
import Editor from '@/components/customized/Editor';

const CreateEvents = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationName, setLocationName] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBanner(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createEventHandler = async () => {
    if (!title || !category || !date || !time || !locationName || !description || !banner) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('location', locationName);
      formData.append('description', description);
      formData.append('banner', banner);

      const response = await api.post('/api/admin/createevent', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response?.data?.success === true) {
        toast.success('Event created successfully!');
        navigate('/admin-dashboard/events', {
          state: { title, category, date, time, locationName, description },
        });

        // Reset
        setTitle('');
        setCategory('');
        setDate('');
        setTime('');
        setLocationName('');
        setDescription('');
        setBanner(null);
        setBannerPreview(null);
      } else {
        toast.error(response.data.message || 'Failed to create event');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:pr-20 md:pl-[320px] pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen font-grotesk">
      <Card className="max-w-4xl mx-auto p-8 space-y-10 shadow-lg dark:bg-gray-800 rounded-xl">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Create A New Event</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm pt-2">Add all event details to create a new event.</p>
        </div>

        <div className="space-y-4 font-garamond">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select onValueChange={(val) => setCategory(val)}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                  <SelectItem value="Competition">Competition</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Location" />
          </div>

          <div className="space-y-2">
            <Label>Banner</Label>
            <Input type="file" accept="image/*" onChange={handleBanner} />
            {bannerPreview && (
              <img src={bannerPreview} alt="Banner Preview" className="mt-2 max-h-40 object-cover rounded" />
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <div className="text-gray-900">
              <Editor description={description} setDescription={setDescription} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={createEventHandler}
              disabled={loading}
              className="flex items-center gap-2 join-pcc-btn"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Event'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateEvents;
