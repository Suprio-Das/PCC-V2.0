import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

type EventItem = {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
};

const CreateEvents = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventItem | null>(null);

  const dummyEvents: EventItem[] = [
    {
      _id: '1',
      title: 'Web Development Workshop',
      category: 'Web Development',
      date: '2025-11-05T14:00:00Z',
      location: 'CSE Seminar Hall',
      description:
        '<p>Join us for an exciting <b>web development</b> session where you will learn about modern React practices!</p>',
    },
    {
      _id: '2',
      title: 'Photography Basics',
      category: 'Photography',
      date: '2025-12-10T10:00:00Z',
      location: 'Auditorium 2',
      description:
        '<p>This session covers the <i>fundamentals</i> of photography, lighting, and editing workflows.</p>',
    },
  ];

  useEffect(() => {
    const found = dummyEvents.find((e) => e._id === id);
    setEvent(found || null);
  }, [id]);

  if (!event) {
    return (
      <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <p className="text-gray-600 dark:text-gray-300">Event not found</p>
      </div>
    );
  }

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto mt-8 font-grotesk">
        <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </Button>

        <Card className="w-full p-6 space-y-4 dark:bg-gray-800 shadow-lg rounded-2xl">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{event.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Category: <span className="font-medium">{event.category}</span>
            </p>
          </div>

          <Separator />

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <b>Date:</b>{' '}
              {new Date(event.date).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p>
              <b>Location:</b> {event.location}
            </p>
          </div>

          <Separator />

          <div
            className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />

          <div className="flex justify-end">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => alert('Registration Coming Soon!')}
            >
              Register Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateEvents;
