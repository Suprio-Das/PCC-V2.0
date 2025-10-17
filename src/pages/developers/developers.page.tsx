import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import DocumentTitle from '@/lib/documentTitle';
import { ImageContainer } from '@/types/assets.type';
import { Facebook, Github, Linkedin } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface People {
  name: string;
  designation: string;
  photo: {
    src: string;
    alt: string;
  };
  social: Social[];
}

interface Social {
  icon: JSX.Element;
  link: string;
}

const PeopleList: People[] = [
  {
    name: 'Jubayer Hossain',
    designation: 'Project Lead',
    photo: {
      src: ImageContainer.Jubayer.src,
      alt: ImageContainer.Jubayer.alt,
    },
    social: [
      {
        icon: <Facebook className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.facebook.com/jubayerhossain556',
      },
      {
        icon: <Github className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://github.com/coder71-bd',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/jubayer75/',
      },
    ],
  },
  {
    name: 'Md. Akibur Rahman',
    designation: 'Development Lead',
    photo: {
      src: ImageContainer.Akib2.src,
      alt: ImageContainer.Akib2.alt,
    },
    social: [
      {
        icon: <Facebook className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.facebook.com/ar.akib2d?mibextid=ZbWKwL',
      },
      {
        icon: <Github className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://github.com/akibur-r',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/akibur-r/',
      },
    ],
  },
  {
    name: 'Md. Akif Shaharier',
    designation: 'Developer',
    photo: {
      src: ImageContainer.Akif.src,
      alt: ImageContainer.Akif.alt,
    },
    social: [
      {
        icon: <Facebook className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.facebook.com/md.akif.1234',
      },
      {
        icon: <Github className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://github.com/Akif-Shaharier',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/md-akif-shaharier-701941261/',
      },
    ],
  },
  {
    name: 'Md. Ayub Islam',
    designation: 'Developer',
    photo: {
      src: ImageContainer.Ayub.src,
      alt: ImageContainer.Ayub.alt,
    },
    social: [
      {
        icon: <Facebook className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.facebook.com/md.ayub724',
      },
      {
        icon: <Github className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://github.com/ayubislam1',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/ayub-islam-749284299/',
      },
    ],
  },
  {
    name: 'Armanul Hai Eatu',
    designation: 'Developer',
    photo: {
      src: ImageContainer.Etu.src,
      alt: ImageContainer.Etu.alt,
    },
    social: [
      {
        icon: <Facebook className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.facebook.com/people/Armanul-Hai-Eatu/pfbid02PkGfSYw9H2SPhK9nS7vTTwxqn8ozBrHCWajvwQC34ojyyGF6sufgvr6RKpQbx8pql/',
      },
      {
        icon: <Github className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://github.com/eatux',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/armanul-hai-eatu-1b8546227/',
      },
    ],
  },
  {
    name: 'Istiaque Uddin Hyder',
    designation: 'Supporting Designer',
    photo: {
      src: ImageContainer.Shohan.src,
      alt: ImageContainer.Shohan.alt,
    },
    social: [
      {
        icon: <Facebook className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.facebook.com/ShohanHyder777',
      },
      {
        icon: <Github className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: '',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/shohan-hyder/',
      },
    ],
  },
];

export const Developers = () => {
  DocumentTitle('DevTeam');
  return (
    <>
      <Navbar />
      <section id="people" className="container flex flex-col gap-12 items-center py-16">
        <div className="text-center w-full">
          <h2 className="font-bold text-3xl mb-4">Our Development Team</h2>
          <p className="text-muted-foreground">
            Meet the minds{' '}
            <span className="text-muted-foreground/70 dark:text-muted-foreground/30">(of course, from CSE 27B)</span>{' '}
            behind this awesome website.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
          {PeopleList.map((person, idx) => (
            <Card
              key={idx}
              className="group relative bg-gradient-to-br from-background to-background/95 border-round shadow-x1 hover:shadow-2xl transition-all duration-300 p-8 md:max-w-72 aspect-square"
            >
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-primary/5" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-primary/10" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_8s_linear_infinite]">
                    <div className="absolute -top-1 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2" />
                  </div>

                  <div className="relative w-32 h-32 rounded-full bg-neutral-400 dark:bg-secondary/20 overflow-hidden border-4 border-background shadow-lg">
                    <img src={person.photo.src} alt={person.photo.alt} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="absolute top-20 left-4 w-3 h-3 rounded-full bg-primary/20" />
                <div className="absolute bottom-12 right-6 w-2 h-2 rounded-full bg-primary/30" />
                <div className="absolute top-1/2 right-4 w-4 h-4 rounded-full bg-primary/10" />

                <div className="space-y-2 mt-4 flex flex-col gap-3 items-center">
                  <h3 className="font-bold text-xl leading-tight">{person.name}</h3>

                  <Badge
                    className={`px-4 text-sm w-fit text-primary bg-primary/10 ${person.designation === 'Project Lead' && 'border-primary'}`}
                    variant={'outline'}
                  >
                    {person.designation}
                  </Badge>

                  <div className="flex gap-3">
                    {person.social.map((social, socialIdx) => (
                      <Link
                        key={socialIdx}
                        to={social.link}
                        target="_blank"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-primary/20 transition-colors"
                      >
                        {React.cloneElement(social.icon, {
                          className: 'w-4 h-4',
                        })}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};
