import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import JoditEditor from 'jodit-react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const UpdateEvent = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationName, setLocationName] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch existing event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/event/${id}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
          const event = data.event;
          setTitle(event.title);
          setCategory(event.category);
          setDate(event.date);
          setTime(event.time);
          setLocationName(event.location);
          setDescription(event.description);
          setBannerPreview(event.bannerUrl || null); // assuming backend returns banner URL
        } else {
          toast.error(data.message || 'Failed to fetch event');
        }
      } catch (err) {
        toast.error('Something went wrong while fetching!');
      } finally {
        setFetching(false);
      }
    };

    fetchEvent();
  }, [id]);

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

  const updateEventHandler = async () => {
    if (!title || !category || !date || !time || !locationName || !description) {
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
      if (banner) formData.append('banner', banner);

      const response = await fetch(`http://localhost:5000/api/admin/updateevent/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Event updated successfully!');
        navigate(`/user-dashboard/publish-event/${id}`);
      } else {
        toast.error(data.message || 'Failed to update event');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:pr-20 md:pl-[320px] pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen font-grotesk">
      <Card className="max-w-4xl mx-auto p-8 space-y-10 shadow-lg dark:bg-gray-800 rounded-xl">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Update Event</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm pt-2">Modify event details below.</p>
        </div>

        <div className="space-y-4 font-garamond">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select onValueChange={(val) => setCategory(val)} value={category}>
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
            <JoditEditor ref={editor} value={description} onChange={setDescription} config={{ height: 300 }} />
          </div>

          <div className="flex justify-end">
            <Button onClick={updateEventHandler} disabled={loading} className="flex items-center gap-2 join-pcc-btn">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update Event'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateEvent;
