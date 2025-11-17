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
import { Loader2, ChevronDownIcon } from 'lucide-react';
import api from '@/Services/api';
import JoditEditor from 'jodit-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const CreateEvents = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [endingTime, setEndingTime] = useState('');
  const [location, setLocation] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  const getDateObject = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

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
    if (!title || !category || !date || !time || !endingDate || !endingTime || !location || !description || !banner) {
      toast.error('Please fill all fields');
      return;
    }

    const startDT = new Date(`${date} ${time}`);
    const endDT = new Date(`${endingDate} ${endingTime}`);

    if (endDT < startDT) {
      toast.error('Ending date & time must be after the starting date & time');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('endingDate', endingDate);
      formData.append('endingTime', endingTime);
      formData.append('location', location);
      formData.append('description', description);
      formData.append('banner', banner);

      const response = await api.post('/api/admin/createevent', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response?.data?.success === true) {
        navigate('/admin-dashboard/events');
        toast.success('Event created successfully!');

        setTitle('');
        setCategory('');
        setDate('');
        setTime('');
        setEndingDate('');
        setEndingTime('');
        setLocation('');
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-20 px-4 sm:px-6 md:px-10 overflow-x-hidden">
      <Card className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 shadow-lg dark:bg-gray-800 rounded-xl">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Create A New Event</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm pt-1">Add all event details to create a new event.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createEventHandler();
          }}
          className="space-y-4 font-garamond"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" />
          </div>

          {/* Category */}
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

          {/* Starting Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="flex flex-col gap-3">
              <Label>Date</Label>
              <Popover open={startCalendarOpen} onOpenChange={setStartCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal">
                    {date ? getDateObject(date).toLocaleDateString() : 'Select start date'}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={date ? getDateObject(date) : undefined}
                    captionLayout="dropdown"
                    disabled={(day) => day < new Date()}
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        const formatted =
                          selectedDate.getFullYear() +
                          '-' +
                          String(selectedDate.getMonth() + 1).padStart(2, '0') +
                          '-' +
                          String(selectedDate.getDate()).padStart(2, '0');
                        setDate(formatted);

                        // Auto-set ending date if empty
                        if (!endingDate) setEndingDate(formatted);

                        setStartCalendarOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Start Time */}
            <div className="flex flex-col gap-3">
              <Label>Time</Label>
              <Input type="time" step="1" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          {/* Ending Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* End Date */}
            <div className="flex flex-col gap-3">
              <Label>Ending Date</Label>
              <Popover open={endCalendarOpen} onOpenChange={setEndCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal">
                    {endingDate ? getDateObject(endingDate).toLocaleDateString() : 'Select ending date'}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={endingDate ? getDateObject(endingDate) : undefined}
                    captionLayout="dropdown"
                    disabled={(day) => day < (date ? getDateObject(date) : new Date())}
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        const formatted =
                          selectedDate.getFullYear() +
                          '-' +
                          String(selectedDate.getMonth() + 1).padStart(2, '0') +
                          '-' +
                          String(selectedDate.getDate()).padStart(2, '0');

                        setEndingDate(formatted);
                        setEndCalendarOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Time */}
            <div className="flex flex-col gap-3">
              <Label>Ending Time</Label>
              <Input type="time" step="1" value={endingTime} onChange={(e) => setEndingTime(e.target.value)} />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Event location" />
          </div>

          {/* Banner */}
          <div className="space-y-2">
            <Label>Banner</Label>
            <Input type="file" accept="image/*" onChange={handleBanner} />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 w-full max-h-56 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <JoditEditor
              ref={editor}
              value={description}
              onBlur={(newContent) => setDescription(newContent)}
              onChange={() => {}}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="flex items-center gap-2 join-pcc-btn">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Event'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateEvents;
