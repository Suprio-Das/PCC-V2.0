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

interface EventData {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  thumbnail: string | File | null;
}

const UpdateEvent = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.eventId;

  // Static demo data (for now)
  const staticEvent = {
    _id: '1',
    title: 'Tech Fiesta 2025',
    subtitle: 'A celebration of innovation and creativity',
    description: '<p>Join us for workshops, hackathons, and fun competitions!</p>',
    date: '2025-11-05',
    time: '10:00 AM',
    location: 'University Main Hall',
    category: 'Competition',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800',
    isPublished: true,
  };

  const [eventData, setEventData] = useState<EventData>({
    title: staticEvent.title,
    date: staticEvent.date,
    time: staticEvent.time,
    location: staticEvent.location,
    category: staticEvent.category,
    thumbnail: staticEvent.thumbnail,
  });

  const [content, setContent] = useState(staticEvent.description);
  const [previewThumbnail, setPreviewThumbnail] = useState<string>(staticEvent.thumbnail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: fetch event details by id (future)
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCategory = (value: string) => {
    setEventData((prev) => ({ ...prev, category: value }));
  };

  const selectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const updateEventHandler = async () => {
    try {
      setLoading(true);
      // Simulate success (replace with API PUT /events/:id later)
      setTimeout(() => {
        toast.success('Event updated successfully (demo)');
        setLoading(false);
      }, 1200);
    } catch (error) {
      toast.error('Event update failed!');
      setLoading(false);
    }
  };

  const togglePublishUnpublish = (action: boolean) => {
    toast.success(`Event ${action ? 'published' : 'unpublished'} (demo)`);
  };

  const deleteEvent = () => {
    toast.success('Event deleted (demo)');
    navigate('/admin-dashboard/all-events');
  };

  return (
    <div className="pb-10 px-3 pt-20 md:pr-20 md:pl-[320px] bg-gray-50 dark:bg-gray-900 min-h-screen font-grotesk">
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
          {/* Header */}
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Update Event</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm pt-2">
              Make changes to your event and click save or publish.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              className="rounded-full border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white px-6 py-2 hover:opacity-90 transition dark:hover:text-black"
              onClick={() => togglePublishUnpublish(!staticEvent.isPublished)}
            >
              {staticEvent.isPublished ? 'Unpublish' : 'Publish'}
            </Button>

            <Button
              variant="destructive"
              className="rounded-full border-[0.5px] border-red-600 bg-[#f2d9d9] shadow-none text-black hover:text-white px-6 py-2 hover:opacity-90 transition"
              onClick={deleteEvent}
            >
              Delete Event
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label>Event Title</Label>
              <Input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                className="dark:border-gray-400 focus:ring-2 focus:ring-green-400 mt-2"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder={eventData.category || 'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                  className="dark:border-gray-400 focus:ring-2 focus:ring-green-400 mt-2"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="dark:border-gray-400 focus:ring-2 focus:ring-green-400 mt-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleChange}
                  className="dark:border-gray-400 focus:ring-2 focus:ring-green-400 mt-2"
                />
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

            <div>
              <Label>Event Description</Label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
                config={{ height: 400 }}
                className="rounded-lg border dark:border-gray-400 mt-2 dark:text-black"
              />
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
              onClick={updateEventHandler}
              className="rounded-full border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white dark:hover:text-black px-6 py-2 hover:opacity-90 transition"
            >
              {loading ? 'Please Wait...' : 'Save Changes'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateEvent;
