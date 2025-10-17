import { ImageContainer } from '@/types/assets.type';
import { Icon } from '@iconify-icon/react';
import React from 'react';
import { Link } from 'react-router-dom';
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
    name: 'Md. Faysal Hossen',
    designation: 'President',
    photo: {
      src: ImageContainer.Faysal.src,
      alt: ImageContainer.Faysal.alt,
    },
    social: [
      {
        icon: <Icon icon={'basil:linkedin-outline'} />,
        link: 'https://www.linkedin.com/in/faysal-sk-a75983261/',
      },
      {
        icon: <Icon icon={'iconoir:facebook'} />,
        link: 'https://www.facebook.com/faysal.shikder.988',
      },
    ],
  },
  {
    name: 'Istiaque Uddin Hyder',
    designation: 'General Secretary',
    photo: {
      src: ImageContainer.ShohanOfficial.src,
      alt: ImageContainer.ShohanOfficial.alt,
    },
    social: [
      {
        icon: <Icon icon={'mdi:github'} />,
        link: 'https://github.com/shohan-hyder',
      },
      {
        icon: <Icon icon={'basil:linkedin-outline'} />,
        link: 'https://www.linkedin.com/in/shohan-hyder/',
      },
      {
        icon: <Icon icon={'iconoir:facebook'} />,
        link: 'https://www.facebook.com/ShohanHyder777',
      },
    ],
  },
  {
    name: 'Rakibul Hassan',
    designation: 'Joint General Secretary',
    photo: {
      src: ImageContainer.Rakib.src,
      alt: ImageContainer.Rakib.alt,
    },
    social: [
      {
        icon: <Icon icon={'mdi:github'} />,
        link: 'https://github.com/Rakibul-Hassan-1',
      },
      {
        icon: <Icon icon={'basil:linkedin-outline'} />,
        link: 'https://www.linkedin.com/in/rakibul-hassan-467a941b4/',
      },
      {
        icon: <Icon icon={'iconoir:facebook'} />,
        link: 'https://www.facebook.com/rakibul.hassan.416569',
      },
    ],
  },
  {
    name: 'Md. Akibur Rahman',
    designation: 'Secretary of Competitive Programming',
    photo: {
      src: ImageContainer.Akib.src,
      alt: ImageContainer.Akib.alt,
    },
    social: [
      {
        icon: <Icon icon={'streamline:web'} />,
        link: 'https://akibur.web.app',
      },
      {
        icon: <Icon icon={'basil:linkedin-outline'} />,
        link: 'https://www.linkedin.com/in/akibur-r/',
      },
      {
        icon: <Icon icon={'iconoir:facebook'} />,
        link: 'https://www.facebook.com/ar.akib2d',
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
              className={`md:block w-64 md:w-72 aspect-[3.5/4] p-0 m-0 relative overflow-hidden group shadow-lg shadow-slate-150 dark:shadow-none`}
              key={idx}
            >
              <img
                src={People.photo.src}
                alt={People.photo.alt}
                className={`right-0 bottom-0 w-48 md:w-64 translate-y-2 object-cover absolute z-10`}
              />
              <CardContent className="p-4 grid grid-rows-2 gap-6 h-full absolute z-20">
                <div className="row-start-1 row-end-2 flex flex-col gap-2">
                  <span className="w-fit text-sm text-primary leading-6">
                    <span className="underline underline-offset-4 decoration-black dark:decoration-white decoration-2">
                      {People.designation.slice(0, 2)}
                    </span>
                    {People.designation.slice(2)}
                  </span>
                  <CardTitle className="text-l leading-8">
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

                <div className="row-start-2 row-end-3 self-end flex flex-col items-center h-fit w-fit p-1 gap-2">
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
        {/* <div>
          <Link
            to={'#'}
            className={`${buttonVariants({ variant: 'outline' })} h-fit flex items-center hover:text-primary gap-x-3`}
          >
            2023-24 Full Executive Committee
          </Link>
        </div> */}
      </section>
    </>
  );
};
