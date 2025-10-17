import { buttonVariants } from '@/components/ui/button';
import { ErrorTitle } from '@/lib/documentTitle';
import { RoutePaths } from '@/types/route.type';
import { Frown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  ErrorTitle('404 | Not Found');
  return (
    <>
      <div className="h-screen w-screen flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col gap-1">
          <Frown className="w-20 h-20 text-destructive" />
          <h1 className="text-xl font-semibold">404: NOT FOUND</h1>
          <span>The Page You&apos;re Trying to Reach is Not Found</span>
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
