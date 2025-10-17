import Monoara from '@/assets/manoara.png';
import Miraj from '@/assets/miraz.png';
import Pranta from '@/assets/pranto.png';
import Safa from '@/assets/shafayet.png';
import { Icon } from '@iconify-icon/react';
import { Dribbble, Facebook, Github, Instagram, Linkedin } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants } from './ui/button';
import { Card, CardContent, CardTitle } from './ui/card';

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
  icon: React.ReactNode;
  link: string;
}

const PeopleList: People[] = [
  {
    name: 'Manoara Begum',
    designation: 'President',
    photo: {
      src: Monoara,
      alt: '',
    },
    social: [
      {
        icon: <Dribbble className='className="w-5 h-5 transition duration-200 hover:text-primary" ' />,
        link: 'https://www.portcity.edu.bd/HomePage/SubPageDetailsInfo/202/Teacher/manoara-begum',
      },
      {
        icon: <Linkedin />,
        link: 'https://www.linkedin.com/in/manoara-begum-14232b102/',
      },
    ],
  },
  {
    name: 'Shafayet Nur',
    designation: 'General Secretary',
    photo: {
      src: Safa,
      alt: '',
    },
    social: [
      {
        icon: <Dribbble className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.portcity.edu.bd/HomePage/SubPageDetailsInfo/377/Teacher/shafayet-nur',
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5.242 13.769L0 9.5L12 0l12 9.5l-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269M12 10a7 7 0 1 0 0 14a7 7 0 0 0 0-14"
            ></path>
          </svg>
        ),
        link: 'https://scholar.google.com/citations?user=Wup-DigAAAAJ&hl=en',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/shafayet-nur-156941201/',
      },
    ],
  },
  {
    name: 'Md. Mahfuzur Rahman Miraz',
    designation: 'Joint General Secretary',
    photo: {
      src: Miraj,
      alt: '',
    },
    social: [
      {
        icon: <Facebook className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.facebook.com/miraz.mahfu',
      },
      {
        icon: <Github className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://github.com/miraz108/',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/md-mahfuzur-rahman-miraz-3b1200210/',
      },
      {
        icon: <Instagram className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.instagram.com/m_i_r_a_z__d_e_w_a_n/profilecard/?igsh=dXBsNjZ1YTJ1OTZl',
      },
    ],
  },
  {
    name: 'Pranta Paul',
    designation: 'Organizational Secretary',
    photo: {
      src: Pranta,
      alt: '',
    },
    social: [
      {
        icon: <Icon icon={'academicons:researchgate'} className="w-5 h-5 text-xl" />,
        link: 'https://www.researchgate.net/profile/Pranta-Paul-3',
      },
      {
        icon: <Linkedin className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/pranta-paul-97aba3212/',
      },
      {
        icon: <Facebook className="w-5 h-5 transition duration-200 hover:text-primary" />,
        link: 'https://www.facebook.com/pranto.pal.96',
      },
    ],
  },
];

export const People = () => {
  return (
    <>
      <section id="people" className="pt-10 container flex flex-col gap-6 items-center">
        <header className="flex flex-col flex-wrap gap-1 text-center">
          <h2 className="font-semibold text-xl md:text-2xl">People in Charge</h2>
          <span className="text-base md:text-md">Who tirelessly contributes to the community</span>
        </header>
        <div className="w-full flex flex-wrap gap-x-4 gap-y-4 justify-around">
          {PeopleList.map((People, idx) => (
            <Card
              className={`${idx % 2 == 1 && 'hidden'} md:block w-64 md:w-72 aspect-[3.5/4] p-0 m-0 relative overflow-hidden group shadow-lg shadow-slate-150 dark:shadow-none`}
              key={idx}
            >
              <img
                src={People.photo.src}
                alt={People.photo.alt}
                className={`right-0 bottom-0 w-[80%] ${People.name == 'Manoara Begum' && 'w-[70%]'} object-cover absolute z-10`}
              />
              <CardContent className="p-4 grid grid-rows-2 gap-6 h-full absolute z-20">
                <div className="row-start-1 row-end-2 flex flex-col gap-6">
                  <span className="w-fit text-sm text-primary">
                    <span className="underline underline-offset-4 decoration-black dark:decoration-white decoration-2">
                      {People.designation.slice(0, 2)}
                    </span>
                    {People.designation.slice(2)}
                  </span>
                  <CardTitle className="text-l">
                    {`${People.name.split(' ').at(0)}`}
                    {People.name.split(' ').at(1) && ` ${People.name.split(' ').at(1)}`}
                    {People.name.split(' ').length > 2 && (
                      <>
                        <br />
                        {People.name.split(' ').at(2)}
                      </>
                    )}
                    {People.name.split(' ').length > 3 && ` ${People.name.split(' ').at(3)}`}
                    {People.name.split(' ').length > 4 && (
                      <>
                        <br />
                        {People.name.split(' ').at(4)}
                      </>
                    )}
                    {People.name.split(' ').length > 5 && (
                      <>
                        <br />
                        {People.name.split(' ').at(5)}
                      </>
                    )}
                  </CardTitle>
                </div>

                <div className="row-start-2 row-end-3 self-end flex flex-col items-center h-fit w-fit p-1 gap-3">
                  {People.social.map((social, idx) => (
                    <Link
                      to={social.link}
                      key={idx}
                      target="_blank"
                      className="transition duration-200 hover:text-primary"
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </CardContent>

              <div className="cardShadow z-1 absolute bg-radial-primary-1 blur-100 group-hover:blur-60 group-hover:rotate-45 transition duration-400"></div>
            </Card>
          ))}
        </div>
        <div>
          <Link
            to={'#'}
            className={`${buttonVariants({ variant: 'outline' })} h-fit flex items-center hover:text-primary gap-x-3`}
          >
            2023-24 Full Executive Committee
          </Link>
        </div>
      </section>
    </>
  );
};
