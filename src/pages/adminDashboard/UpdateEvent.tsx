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
import { toast } from 'sonner';
import { Loader2, ChevronDownIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import JoditEditor from 'jodit-react';

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
  const [calendarOpen, setCalendarOpen] = useState(false);

  const getDateObject = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/event/${id}`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          const event = data.event;
          setTitle(event.title);
          setCategory(event.category);
          setDate(event.date);
          setTime(event.time);
          setLocationName(event.location);
          setDescription(event.description);
          setBannerPreview(event.bannerUrl || null);
        } else {
          toast.error(data.message || 'Failed to fetch event');
        }
      } catch {
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
      reader.onloadend = () => setBannerPreview(reader.result as string);
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

      const res = await fetch(`http://localhost:5000/api/admin/updateevent/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Event updated successfully!');
        navigate(`/user-dashboard/publish-event/${id}`);
      } else {
        toast.error(data.message || 'Failed to update event');
      }
    } catch {
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
    <div className="pb-20 pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen sm:px-6 md:px-10">
      <Card className="w-full max-w-4xl mx-auto p-8 space-y-10 shadow-lg dark:bg-gray-800 rounded-xl">
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

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div className="flex flex-col gap-3">
              <Label>Date</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal">
                    {date ? getDateObject(date).toLocaleDateString() : 'Select date'}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date ? getDateObject(date) : undefined}
                    captionLayout="dropdown"
                    onSelect={(selected) => {
                      if (selected) {
                        const localDate = `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(
                          2,
                          '0',
                        )}-${String(selected.getDate()).padStart(2, '0')}`;
                        setDate(localDate);
                        setCalendarOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time */}
            <div className="flex flex-col gap-3">
              <Label>Time</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
              />
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
