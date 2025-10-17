import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

import PCCLogo from '@/assets/pcc-logo.png';
import { Link } from 'react-router-dom';
import { buttonVariants } from './ui/button';

import { RoutePaths } from '@/types/route.type';
import ThemeToggle from './customized/ThemeToggle/ThemeToggle';
import { Menu } from 'lucide-react';

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: RoutePaths.TIMELINE,
    label: 'Timeline',
  },
  {
    href: RoutePaths.ABOUT,
    label: 'About',
  },
  {
    href: RoutePaths.CONTACT,
    label: 'Contact',
  },
  {
    href: RoutePaths.EVENTS,
    label: 'Events',
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-20 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <a rel="noreferrer noopener" href="/" className="ml-2 font-bold text-xl flex">
              <img src={PCCLogo} alt="PCC" className="h-14 w-auto" />
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="flex md:hidden h-8 w-8" onClick={() => setIsOpen(true)}>
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">PCC</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      to={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {label}
                    </Link>
                  ))}
                  <div className="mt-3">
                    <ThemeToggle />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                to={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: 'ghost',
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
