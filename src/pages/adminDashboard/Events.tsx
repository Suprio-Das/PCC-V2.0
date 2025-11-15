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
import { Edit, Trash2, ClipboardCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/Services/api';

type Event = {
  _id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  status: string;
};

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/admin/getevents');
        if (response.data.success) {
          const sortedEvents = [...response.data.events].sort(
            (a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
          setEvents(sortedEvents);
        }
      } catch (error) {
        toast.error('Failed to load events');
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event._id !== id));
    toast.success('Event removed (static mode)');
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Events</h1>

          {events.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No events found.</p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto rounded-lg">
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
                      <TableHead>Status</TableHead>
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
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              event.status === 'ongoing'
                                ? 'bg-green-100 text-green-700'
                                : event.status === 'upcoming'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <BsThreeDotsVertical className="cursor-pointer text-gray-600 dark:text-gray-300" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1">
                              <DropdownMenuItem
                                className="font-grotesk"
                                onClick={() => navigate(`/events/${event._id}`)}
                              >
                                <Edit className="mr-2 size-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="font-grotesk"
                                onClick={() => navigate(`/admin-dashboard/events/${event._id}/registered-students`)}
                              >
                                <ClipboardCheck className="mr-2 size-4" /> Registered
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500 font-grotesk"
                                onClick={() => deleteEvent(event._id)}
                              >
                                <Trash2 className="mr-2 size-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="grid grid-cols-1 gap-4 mt-6 md:hidden">
                {events.map((event) => (
                  <Card key={event._id} className="p-4 dark:bg-gray-800 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-semibold text-gray-800 dark:text-gray-100">{event.title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{event.category}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(event.date)}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
                        <p
                          className={`text-xs mt-1 ${
                            event.status === 'ongoing'
                              ? 'text-green-500'
                              : event.status === 'upcoming'
                                ? 'text-blue-500'
                                : 'text-gray-400'
                          }`}
                        >
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <BsThreeDotsVertical className="cursor-pointer text-gray-600 dark:text-gray-300" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1">
                          <DropdownMenuItem className="font-grotesk" onClick={() => navigate(`/events/${event._id}`)}>
                            <Edit className="mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500 font-grotesk"
                            onClick={() => deleteEvent(event._id)}
                          >
                            <Trash2 className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Events;
