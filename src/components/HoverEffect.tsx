import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

import { useState } from 'react';

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;

    icon: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('relative py-10', className)}>
      <div className="absolute inset-0 h-full w-full  dark:to-black rounded-full blur-3xl z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 ">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-green-800/[0.8]  block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>

            <Card>
              <div className="relative z-10">
                {' '}
                {/* Ensure this content is above meteors */}
                <div className="flex items-center space-x-2">
                  <CardIcon className="flex-shrink-0">{item.icon}</CardIcon>
                  <CardTitle className="flex-grow">{item.title}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-black border dark:border-white/[0.2] group-hover:border-green-700 relative  bg-gradient-to-r from-blue-500 to-teal-500 :bg-gradient-to-t :from-red-500  dark:to-black   z-20',
        className,
      )}
    >
      <div className="cardShadow z-1 absolute bg-radial-primary-1 blur-100 group-hover:blur-60 group-hover:rotate-45 transition duration-400"></div>
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardIcon = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={cn('text-primary dark:text-white h-5 w-8 flex items-center justify-center', className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <h4 className={cn('text-primary dark:text-white text-xl font-bold tracking-wide leading-snug', className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn('mt-4 text-zinc-500 tracking-wide leading-relaxed text-base', className)}>{children}</p>;
};
