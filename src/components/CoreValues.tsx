import {
  Award,
  BrainCircuit,
  ChevronsRightLeft,
  ClipboardCheck,
  PlugZap,
  Rocket,
  Sparkles,
  Trophy,
} from 'lucide-react';
// import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import Carousel, { Slider, SliderContainer, SliderDotButton } from '@/components/ui-layout/Carousel';
import { cn } from '@/lib/utils';
import { EmblaOptionsType } from 'embla-carousel';

export const CoreValues = () => {
  const OPTIONS: EmblaOptionsType = { loop: true };

  const features = [
    {
      title: 'Skill Enhancement Workshops',
      description:
        'The club conducts workshops covering diverse topics to facilitate continuous learning and skill development.',
      icon: <Rocket />,
    },
    {
      title: 'Dynamic Competitions',
      description: 'Hosting challenging events like programming contests and hackathons',
      icon: <BrainCircuit />,
    },
    {
      title: 'Structured Mentorship Programs',
      description: 'Establishment of mentorship initiatives, which enables experienced members to guide newer ones.',
      icon: <PlugZap />,
    },
    {
      title: 'Insightful Seminars',
      description: `Inviting industry experts to share practical experiences on the applications of computer science.`,
      icon: <Sparkles />,
    },
    {
      title: 'Promotion of Collaboration',
      description:
        'A collaborative environment is cultivated, where members collaborate on projects and exchange ideas.',
      icon: <ChevronsRightLeft />,
    },
    {
      title: 'Recognition of Progress',
      description: `Acknowledging and celebrating members' efforts, regardless of scale, contributes to a positive environment.`,
      icon: <Award />,
    },
    {
      title: 'Constructive Feedback Culture',
      description:
        'Providing constructive and positive feedback, both from peers and mentors, creates a supportive atmosphere.',
      icon: <ClipboardCheck />,
    },
    {
      title: 'Engagement in Coding Communities',
      description: 'Encouraging participation in coding communities beyond the university.',
      icon: <Trophy />,
    },
  ];
  return (
    <>
      <section className="container pt-4 px-4 lg:px-10">
        <header className="flex flex-col flex-wrap gap-1 text-center">
          <h4 className="text-md">What drives PCC?</h4>
          <h2 className="font-semibold text-2xl">Our Core Values</h2>
        </header>

        {/* Mobile View */}
        <div className="md:hidden container pt-8">
          <>
            <Carousel options={OPTIONS} isAutoPlay={true} className="relative">
              <SliderContainer className="flex gap-4 ">
                {features.map((feature, index) => (
                  <Slider key={index} className="w-full aspect-[9/10]">
                    <div className="relative group/feature border-2 dark:border-neutral-800 border-neutral-300 w-full h-full flex flex-col py-10 rounded-xl">
                      <div className="relative z-10 px-8 py-6 text-neutral-600 dark:text-neutral-400">
                        {feature.icon}
                      </div>
                      <div className="text-lg font-bold relative z-10 px-8 pb-4">
                        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
                        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 group-hover/feature:text-primary max-w-prose-20">
                          {feature.title}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 z-10 px-8">{feature.description}</p>
                    </div>
                  </Slider>
                ))}
              </SliderContainer>
              <div className="w-full flex justify-center my-[-1rem] absolute">
                <SliderDotButton />
              </div>
            </Carousel>
          </>
        </div>

        {/* Tabs, Desktop  View*/}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2  relative z-10 py-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </section>
    </>
  );
};

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800 rounded-md',
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 group-hover/feature:text-primary">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">{description}</p>
    </div>
  );
};
