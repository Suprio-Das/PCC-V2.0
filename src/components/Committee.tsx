import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import Group from '../assets/group-of-people.jpg';
import { ExpandableCardDemo } from '@/components/Expandable';
import { LampDemo } from '../components/LapmDemo';

export const CommitteeSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const committees = [
    {
      id: 1,
      session: 'Session: 2023-2024',
      description:
        'This committee was responsible for several successful events and initiatives, focusing on expanding community outreach.',
      highlights: 'Meet the awesome committee members of session 2023.',
      image: Group,
    },
    {
      id: 2,
      session: 'Session: 2024-2025',
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-8">
      {committees.map((committee) => (
        <AccordionItem
          key={committee.id}
          value={`item-${committee.id}`}
          className="border-b border-green-300 dark:border-white"
        >
          <AccordionTrigger
            className="flex justify-between items-center text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white py-3 md:py-4 transition-all duration-300 ease-in-out hover:text-green-500 dark:hover:text-green-500 ml-3 md:ml-5"
            onClick={() => toggleItem(committee.id)}
          >
            {committee.session}
          </AccordionTrigger>

          {openItem === committee.id && (
            <AccordionContent className="transition-all duration-700 ease-in-out transform opacity-100">
              <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-6 mt-4 md:mt-0">
                <div className="p-4 md:p-6 flex-1 bg-white dark:bg-transparent rounded-lg shadow-sm transition-shadow">
                  <p className="text-gray-600 dark:text-gray-300 text-base text-center md:text-lg leading-relaxed">
                    {committee.description}
                  </p>
                  {committee.highlights && (
                    <p className="text-gray-500 dark:text-gray-400 text-center italic mt-3 md:mt-4">
                      Highlights: {committee.highlights}
                    </p>
                  )}
                </div>
              </div>

              {committee.id === 2 && <LampDemo />}
            </AccordionContent>
          )}

          {openItem === committee.id && committee.id === 1 && <ExpandableCardDemo />}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
