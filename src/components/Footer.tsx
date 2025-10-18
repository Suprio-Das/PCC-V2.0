import { ImageContainer } from '@/types/assets.type';
import { RoutePaths } from '@/types/route.type';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Anchor {
  title: string;
  link: string;
}

interface AnchorCollection {
  title: string;
  anchors: Anchor[];
}

const FooterAnchorList: AnchorCollection[] = [
  {
    title: 'Sitemap',
    anchors: [
      {
        title: 'About',
        link: RoutePaths.ABOUT,
      },
      {
        title: 'Events',
        link: RoutePaths.EVENTS,
      },
      {
        title: 'Timeline',
        link: RoutePaths.TIMELINE,
      },
      {
        title: 'Contact',
        link: RoutePaths.CONTACT,
      },
    ],
  },
  {
    title: 'Important Links',
    anchors: [
      {
        link: 'https://portcity.edu.bd',
        title: 'PCIU Website',
      },
      {
        link: 'https://www.portcity.edu.bd/HomePage/ListPrimary/9/T/view-teacher-list',
        title: 'CSE Faculty Info',
      },
    ],
  },
];

export const Footer = () => {
  return (
    <footer id="footer" className="">
      <hr className="w-full mx-auto mt-2" />

      <section className="container mx-0 py-20 flex flex-wrap justify-between gap-x-12 gap-y-8">
        <div className="flex flex-col gap-3 flex-1">
          <Link rel="noreferrer noopener" to={RoutePaths.ROOT} className="font-bold text-xl flex w-fit">
            <img
              src={ImageContainer.PCCLogo.src}
              alt={ImageContainer.PCCLogo.alt}
              className="h-20 aspect-square object-fit"
            />
          </Link>
          <h3 className="text-lg font-semibold tracking-wide">PCIU Computer Club</h3>
          <div className="flex gap-2 items-center">
            <MapPin className="h-8 w-auto aspect-square text-primary" />
            <span className="text-sm min-w-48">
              <p>Nikunja Housing Society, South Khulshi</p>
              <p>Chattogram, Bangladesh</p>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-16 md:gap-x-20 gap-y-8 justify-center md:justify-start">
          {FooterAnchorList.map(({ title, anchors }, index) => (
            <div className="flex flex-col gap-2 items-start" key={index}>
              <h3 className=" font-semibold text-lg tracking-wide">{title}</h3>
              <ul className="flex flex-col gap-y-1 opacity-90 text-left">
                {anchors.map(({ title, link }, idx) => (
                  <Link to={link} target={'_blank'} className="group" key={idx}>
                    <li className="group-hover:underline">{title}</li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-0 pt-2 pb-3 flex  justify-between bg-secondary">
        <div className="container flex flex-wrap gap-y-4 gap-x-4 justify-center">
          <span className="min-w-fit">&copy; 2025 PCIU Computer Club</span>
          <span className={`hidden md:block`}>|</span>
          <span className="">
            PCC V2.0 Developed with ♡ by&nbsp;
            <Link to={RoutePaths.DEV} className="font-bold text-primary hover:underline hover:underline-offset-2">
              PCC Executive Committee 2024-25
            </Link>
          </span>
        </div>
      </section>
    </footer>
  );
};
