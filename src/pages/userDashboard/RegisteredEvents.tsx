import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/Services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';

// Type for static event
type Event = {
  _id: string;
  title: string;
  date: string;
  location: string;
  category: string;
};

interface UserType {
  userId: string;
}

const RegisteredEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.Auth.user) as UserType | null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      setLoading(true);
      const res = await api.get(`/api/student/getregisteredevents/${userId}`);
      if (res.data.success === true) {
        setEvents(res.data.events);
        setLoading(false);
      } else {
        setEvents([]);
        setLoading(false);
      }
    };
    fetchRegisteredEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event._id !== id));
    toast.success('Event removed (static mode)');
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Registered Events</h1>

          {loading === true ? (
            <div className="py-10 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-300" />
            </div>
          ) : events.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No events found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                  List of your registered events.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{event.category}</TableCell>
                      <TableCell>{formatDate(event.date)}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical className="cursor-pointer text-gray-600 dark:text-gray-300" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1">
                            <DropdownMenuItem className="font-grotesk" onClick={() => navigate(`/events/${event._id}`)}>
                              <Edit className="mr-2" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 font-grotesk"
                              onClick={() => deleteEvent(event._id)}
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

export default RegisteredEvents;
