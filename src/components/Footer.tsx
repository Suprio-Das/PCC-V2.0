import { ImageContainer } from '@/types/assets.type';
import { RoutePaths } from '@/types/route.type';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

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
      { title: 'About', link: RoutePaths.ABOUT },
      { title: 'Events', link: RoutePaths.EVENTS },
      { title: 'Timeline', link: RoutePaths.TIMELINE },
      { title: 'Contact', link: RoutePaths.CONTACT },
    ],
  },
  {
    title: 'Important Links',
    anchors: [
      { link: 'https://portcity.edu.bd', title: 'PCIU Website' },
      {
        link: 'https://www.portcity.edu.bd/HomePage/ListPrimary/9/T/view-teacher-list',
        title: 'CSE Faculty Info',
      },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-6 text-gray-700 dark:text-gray-300">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start text-center md:text-left relative">
          {/* Logo + Address */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to={RoutePaths.ROOT} className="flex flex-col items-center md:items-start gap-2 group">
              <img
                src={ImageContainer.PCCLogo.src}
                alt={ImageContainer.PCCLogo.alt}
                className="h-20 w-auto transition-transform duration-500 group-hover:scale-105"
              />
              <span className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide font-garamond">
                PCIU Computer Club
              </span>
            </Link>

            <div className="text-sm leading-6 font-garamond">
              <p>Nikunja Housing Society, South Khulshi</p>
              <p>Chattogram, Bangladesh</p>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 font-garamond">Sitemap</h4>
            <ul className="space-y-2 text-sm">
              {FooterAnchorList[0].anchors.map(({ title, link }, idx) => (
                <li key={idx}>
                  <Link to={link} className="hover:text-green-600 transition-colors duration-300 font-garamond">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 font-garamond">
              Important Links
            </h4>
            <ul className="space-y-2 text-sm">
              {FooterAnchorList[1].anchors.map(({ title, link }, idx) => (
                <li key={idx}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-green-600 transition-colors duration-300 font-garamond"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 font-garamond">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-5">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-6 text-center text-sm font-poppins">
          <p>
            &copy; 2025 PCIU Computer Club — Developed with ♡ by{' '}
            <Link to={RoutePaths.DEV} className="font-semibold text-green-600 hover:underline">
              PCC Executive Committee 2024-25
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
