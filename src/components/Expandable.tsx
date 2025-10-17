'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UseOutsideClick } from '../components/UseoutSide';
import { Facebook, Github, Linkedin } from 'lucide-react';

import Monoara from '@/assets/manoara.png';
import Safa from '@/assets/shafayet.png';
import Miraj from '@/assets/miraz.png';
import Pranta from '@/assets/pranto.png';

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  UseOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              ref={ref}
              layoutId={`card-${active.title}-${id}`}
              className="w-full max-w-[350px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="flex justify-center items-center  h-80 overflow-hidden"
              >
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="object-cover object-center w-[250px] h-[300px] rounded-t-lg bg-white"
                />
              </motion.div>

              <div className="flex flex-col p-4 space-y-4 overflow-hidden h-40 md:h-fit">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="font-bold text-neutral-700 dark:text-neutral-200"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {active.description}
                </motion.p>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-2">
                  {active.social?.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>

                {/* Content Section with Inner Scroll */}
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base flex flex-col items-start gap-4 overflow-y-auto max-h-[40vh] pr-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style>
                    {`
                      .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                      }
                    `}
                  </style>
                  <div className="hide-scrollbar">
                    {typeof active.content === 'function' ? active.content() : active.content}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto mb-10 w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row items-center justify-center">
              <motion.div layoutId={`image-${card.title}-${id}`} className="flex items-center justify-center">
                <div>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-40 w-40 md:h-16 md:w-16 rounded-lg object-cover object-top"
                  />
                </div>
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: 'President',
    title: 'Manoara Begum',
    src: Monoara,
    ctaText: 'View',
    ctaLink: 'https://ui.aceternity.com/templates',
    social: [
      { icon: <Facebook className="w-5 h-5 hover:text-primary" />, link: 'https://www.facebook.com/DreamyMon' },
      {
        icon: <Github className="w-5 h-5 hover:text-primary" />,
        link: 'https://www.portcity.edu.bd/HomePage/SubPageDetailsInfo/202/Teacher/manoara-begum',
      },
      { icon: <Linkedin className="w-5 h-5 hover:text-primary" />, link: 'https://linkedin.com' },
    ],
    content: () => {
      return (
        <p>
          Department of Computer Science and Engineering <br /> Port City International University
        </p>
      );
    },
  },
  {
    description: 'General Secretary',
    title: 'Mr. Shafayet Nur',
    src: Safa,
    ctaText: 'View',
    ctaLink: 'https://ui.aceternity.com/templates',
    social: [
      { icon: <Facebook className="w-5 h-5 hover:text-primary" />, link: 'https://www.facebook.com/ShafayetAbir217/' },
      { icon: <Github className="w-5 h-5 hover:text-primary" />, link: 'https://github.com/miraz108/' },
      {
        icon: <Linkedin className="w-5 h-5 hover:text-primary" />,
        link: 'https://www.linkedin.com/in/md-mahfuzur-rahman-miraz-3b1200210/',
      },
    ],
    content: () => {
      return (
        <p>
          Department of Computer Science and Engineering <br /> Port City International University
        </p>
      );
    },
  },

  {
    description: 'Joint-General Secretary',
    title: 'Md. Mahfuzur Rahman Miraz',
    src: Miraj,
    ctaText: 'View',
    ctaLink: 'https://ui.aceternity.com/templates',
    social: [
      { icon: <Facebook className="w-5 h-5 hover:text-primary" />, link: 'https://www.facebook.com/miraz.mahfu' },
      { icon: <Github className="w-5 h-5 hover:text-primary" />, link: 'https://github.com' },
      { icon: <Linkedin className="w-5 h-5 hover:text-primary" />, link: 'https://linkedin.com' },
    ],
    content: () => {
      return <p>CSE 21</p>;
    },
  },
  {
    description: 'Organizational Secretary',
    title: 'Pranta Paul',
    src: Pranta,
    ctaText: 'View',
    ctaLink: 'https://ui.aceternity.com/templates',
    social: [
      { icon: <Facebook className="w-5 h-5 hover:text-primary" />, link: 'https://www.facebook.com' },
      { icon: <Github className="w-5 h-5 hover:text-primary" />, link: 'https://github.com' },
      { icon: <Linkedin className="w-5 h-5 hover:text-primary" />, link: 'https://linkedin.com' },
    ],
    content: () => {
      return <p>CSE 21</p>;
    },
  },
];
