import { buttonVariants } from '@/components/ui/button';
import { ErrorTitle } from '@/lib/documentTitle';
import { RoutePaths } from '@/types/route.type';
import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UnderMaintenance = () => {
  ErrorTitle('503 | Page Under Maintainance');

  return (
    <>
      <div className="h-screen w-screen flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col gap-1 px-4">
          <Wrench className="w-20 h-20 text-slate-400" />
          <h1 className="text-xl font-semibold">PAGE UNDER Maintenance</h1>
          <span className="max-w-prose-50">
            This Page is Under Maintainance. The Page Will be Available with Some Cool Stuff Soon.
          </span>
        </div>

        <Link
          to={RoutePaths.ROOT}
          className={`${buttonVariants({
            variant: 'secondary',
          })} border-2 border-slate-300 dark:border-none`}
        >
          Go back Home
        </Link>
      </div>
    </>
  );
};
