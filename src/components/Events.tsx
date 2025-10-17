import { ImageContainer } from '@/types/assets.type';
import { CalendarDays, ChevronsRight, Facebook, Github, Linkedin, MapPin } from 'lucide-react';
import React from 'react';

import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface Event {
  name: string;
  tagline: string;
  date: Date;
  venue: {
    name: string;
    location: string;
  };
  coverImage: {
    src: string;
    alt: string;
  };
  social: Social[];
}

interface Social {
  icon: React.ReactNode;
  link: string;
}

const EventList: Event[] = [
  {
    name: 'PCIU Computer Club 1st Anniversary',
    tagline:
      'The most exciting and anticipating event of the year. New Committee will take authority and the old committee will bid farewell. Filled with cultaral programs, presence of distinguished guests.',
    date: new Date('2024-11-01'),
    venue: {
      name: 'Classic World Convention',
      location: 'Agrabad, Chattogram',
    },
    coverImage: {
      src: ImageContainer.FirstAnniversaryBanner.src,
      alt: ImageContainer.FirstAnniversaryBanner.alt,
    },
    social: [
      {
        icon: <Facebook className='className="w-5 h-5 transition duration-200 hover:text-primary" ' />,
        link: 'https://www.facebook.com',
      },
      {
        icon: <Github className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: '',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: '',
      },
    ],
  },
];

export const Events = () => {
  return (
    <>
      <section id="Event" className="container flex flex-col gap-6 items-center py-10">
        <header className="flex flex-col flex-wrap gap-1 text-center">
          <h2 className="font-semibold text-xl md:text-2xl">Featured Event</h2>
          <p>Latest Campaign by the PCIU Computer Club</p>
        </header>

        {/* Mobile */}
        <div className="container pt-4 relative md:hidden">
          <>
            {EventList.map((event, index) => (
              <Card
                key={index}
                className="w-full shadow-md shadow-slate-300 dark:shadow-none grid grid-cols-1 grid-rows-10 rounded-xl p-2 group/event dark:bg-background dark:border-2 dark:border-slate-900"
              >
                <CardHeader className="row-span-4 col-span-full rounded-t-xl flex justify-center items-center transition duration-400">
                  <img
                    src={ImageContainer.FirstAnniversaryBanner.src}
                    alt={ImageContainer.FirstAnniversaryBanner.alt}
                    className="transition-all duration-400 rounded-lg group-hover/event:scale-90"
                  />
                </CardHeader>
                <CardFooter className="row-span-6 col-span-full flex flex-col gap-2 pt-2 group-hover/event:-translate-y-1 transition duration-400">
                  <CardContent className="w-full flex flex-col gap-1 align-left">
                    <span className="flex gap-1 items-center text-sm">
                      <CalendarDays className="stroke-1 w-4 h-4 group-hover/event:text-primary transition duration-200" />
                      {`${event.date.toLocaleString('default', { month: 'long' })} ${event.date.getDate()}, ${event.date.getFullYear()}`}
                    </span>
                    <span className="flex gap-1 items-center text-sm">
                      <MapPin className="stroke-1 w-4 h-4 group-hover/event:text-primary transition duration-400" />
                      {event.venue.name} {event.venue.location}
                    </span>
                  </CardContent>
                  <CardTitle className="text-xl pt-1 group-hover/event:translate-x-1 transition duration-400">
                    {event.name}
                  </CardTitle>
                  <CardDescription className="flex flex-col ">{event.tagline}</CardDescription>
                  <CardContent className="w-full flex justify-start">
                    <Link
                      to={'#'}
                      className={`h-fit bg-primary px-2 py-1 flex items-center text-base rounded-md group/link text-black`}
                    >
                      Event Details{' '}
                      <ChevronsRight className="group-hover/link:translate-x-1 stroke-1 transition duration-400" />
                    </Link>
                  </CardContent>
                </CardFooter>
              </Card>
            ))}
          </>
        </div>

        {/* Desktop, Tabs */}
        <div className="hidden md:block container relative">
          <>
            {EventList.map((event, index) => (
              <Card
                key={index}
                className="w-full shadow-md shadow-slate-200 dark:shadow-none grid grid-cols-8  grid-rows-1 gap-8 rounded-xl p-2 group/event dark:bg-background dark:border-2 dark:border-slate-900"
              >
                <CardHeader className="col-span-5 row-span-full rounded-t-xl flex justify-center items-center transition duration-400 py-3">
                  <img
                    src={ImageContainer.FirstAnniversaryBanner.src}
                    alt={ImageContainer.FirstAnniversaryBanner.alt}
                    className="transition-all duration-400 rounded-lg group-hover/event:scale-98"
                  />
                </CardHeader>
                <CardFooter className="col-span-4 row-span-full flex flex-col gap-4 justify-start py-4 transition duration-400">
                  <CardTitle className="w-full text-left text-4xl pt-1 flex flex-col gap-2 ">
                    <div>
                      <Badge variant={'destructive'}>Past Event</Badge>
                    </div>
                    <div className="group-hover/event:text-primary transition duration-400">{event.name}</div>
                  </CardTitle>
                  <CardDescription className="flex flex-col text-base group-hover/event:translate-x-2 transition duration-400">
                    {event.tagline}
                  </CardDescription>

                  <CardContent className="w-full flex flex-col gap-1 align-left group-hover/event:translate-x-2 transition duration-400">
                    <span className="flex gap-2 items-center text-base">
                      <CalendarDays className="stroke-2 w-4 h-4 group-hover/event:text-primary transition duration-200" />
                      {`${event.date.toLocaleString('default', { month: 'long' })} ${event.date.getDate()}, ${event.date.getFullYear()}`}
                    </span>
                    <span className="flex gap-2 items-center text-base">
                      <MapPin className="stroke-2 w-4 h-4 group-hover/event:text-primary transition duration-400" />
                      {event.venue.name} {event.venue.location}
                    </span>
                  </CardContent>
                </CardFooter>
              </Card>
            ))}
          </>
        </div>
      </section>
    </>
  );
};
