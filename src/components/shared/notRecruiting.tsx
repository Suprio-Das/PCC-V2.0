import { CalendarX2 } from 'lucide-react';

export const NotRecruiting = () => {
  return (
    <>
      <div className="container py-64 flex flex-col gap-2 md:gap-4 items-center justify-center text-center">
        <span className="flex justify-center w-full">
          <CalendarX2 className="w-16 h-16 text-red-600" />
        </span>
        <span className="md:text-xl max-w-prose-40">
          PCIU Computer Club is not recruiting members now. Please check back soon.
        </span>
      </div>
    </>
  );
};
