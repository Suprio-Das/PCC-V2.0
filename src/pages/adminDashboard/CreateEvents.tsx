import { Button } from '@/components/ui/button';
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
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dummy event type
type Event = {
  _id: string;
  title: string;
  category: string;
};

const CreateEvents = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [events, setEvents] = useState<Event[]>([]); // Local event state for static mode
  const navigate = useNavigate();

  const getSelectedCategory = (value: string) => setCategory(value);

  const createEventHandler = async () => {
    if (!title || !category) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      const newEvent: Event = {
        _id: Date.now().toString(),
        title,
        category,
      };

      setEvents([...events, newEvent]);

      navigate(`/user-dashboard/create-event/${newEvent._id}`);
      toast.success('Event created successfully (static mode)');

      // Reset form
      setTitle('');
      setCategory('');
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:pr-20 h-screen md:pl-[320px] pt-40 bg-gray-50 dark:bg-gray-900 font-grotesk">
      <Card className="max-w-3xl mx-auto p-8 space-y-6 shadow-lg dark:bg-gray-800 rounded-xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 text-center font-grotesk">
            Create a New Event
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Add your club or departmental event details here.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">Event Title</Label>
            <Input
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full md:w-72 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-gray-500 focus:border-gray-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                  <SelectItem value="Competition">Competition</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2 rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white px-6 py-2 hover:opacity-90 transition dark:hover:text-black"
              disabled={loading}
              onClick={createEventHandler}
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
