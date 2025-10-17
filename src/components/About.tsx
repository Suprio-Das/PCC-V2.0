import { buttonVariants } from '@/components/ui/button';
import { ImageContainer } from '@/types/assets.type';
import { RoutePaths } from '@/types/route.type';
import { Link } from 'react-router-dom';

interface Feature {
  image: {
    src: string;
    alt: string;
  };
  name: string;
}

const FeatureList: Feature[] = [
  //Exactly 4 objects for the grid
  {
    image: {
      src: ImageContainer.Community.src,
      alt: ImageContainer.Community.alt,
    },
    name: 'Community',
  },
  {
    image: {
      src: ImageContainer.CodeBG.src,
      alt: ImageContainer.CodeBG.alt,
    },
    name: 'Collaboration',
  },
  {
    image: {
      src: ImageContainer.SpiderWeb.src,
      alt: ImageContainer.SpiderWeb.alt,
    },
    name: 'Network',
  },
  {
    image: {
      src: ImageContainer.Elevate.src,
      alt: ImageContainer.Elevate.alt,
    },
    name: 'Development',
  },
];

export const About = () => {
  return (
    <section id="about" className="container py-12 md:py-16 flex flex-col gap-4 items-center">
      {/* <header className="py-2 flex flex-col flex-wrap gap-1 text-center">
        <span className="text-base md:text-md">PCIU Computer Club at a glance</span>
        <h2 className="font-semibold text-xl md:text-2xl">What is PCC?</h2>
      </header> */}
      <div className="md:grid md:grid-cols-10 md:grid-rows-1 md:gap-12 align-center text-center md:text-left">
        <div className="col-span-4 row-span-full grid grid-rows-2 grid-cols-2 gap-4 p-4">
          {/* this section is for 3d vectors */}
          {FeatureList.map((Feature, idx) => (
            <div
              className="relative aspect-[16/8] overflow-hidden border-2 rounded-xl border-slate-300 dark:border-slate-800 shadow-sm group/feature transition duration-400"
              key={idx}
            >
              <img
                src={Feature.image.src}
                alt=""
                key={idx}
                className="h-full w-full brightness-75 md:brightness-90 blur-[1px] rounded-inherit scale-105 group-hover/feature:scale-100 "
              />
              <div className="absolute top-0 text-white font-semibold text-base md:text-lg tracking-wide h-full w-full flex justify-center items-center group-hover/feature:scale-105 transition duration-400">
                {Feature.name}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-6 flex flex-col pt-4 gap-12 justify-around">
          <div className="flex flex-col row-span-full gap-6 items-center md:items-start">
            <h3 className="font-bold text-2xl md:text-3xl">Community Matters the Most.</h3>
            <p className="tracking-wide">
              Founded in 2023, we’ve always focused on providing values to the members through arranging various
              workshops, seminars, contests and sessions. We always promote harmony, collaboration, and growth in every
              field of Computer Science.
            </p>
            <Link
              to={RoutePaths.ABOUT}
              className={`${buttonVariants({ variant: 'outline' })} w-fit border-slate-400 dark:border-slate-700`}
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
