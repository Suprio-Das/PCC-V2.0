import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

import PCCLogo from '@/assets/pcc-logo.png';
import { buttonVariants } from './ui/button';

import { RoutePaths } from '@/types/route.type';
import { Link } from 'react-router-dom';
import ThemeToggle from './customized/ThemeToggle/ThemeToggle';
import { Menu } from 'lucide-react';

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: RoutePaths.TIMELINE, label: 'Timeline' },
  { href: RoutePaths.ABOUT, label: 'About' },
  { href: RoutePaths.BLOG, label: 'Blog' },
  { href: RoutePaths.EVENTS, label: 'Events' },
  { href: RoutePaths.CONTACT, label: 'Contact Us' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-20 px-4 w-screen flex justify-between items-center">
          {/* Logo */}
          <NavigationMenuItem className="flex items-center">
            <Link to="/" className="ml-2 text-xl flex items-center">
              <img src={PCCLogo} alt="PCC" className="h-14 w-auto" />
            </Link>
          </NavigationMenuItem>

          {/* Mobile Menu */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="h-8 w-8" onClick={() => setIsOpen(true)} />
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">PCC</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      to={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {label}
                    </Link>
                  ))}
                  <div className="mt-3 flex flex-col gap-2 items-center">
                    <ThemeToggle />
                    <Link
                      to={RoutePaths.SIGN_IN}
                      className="px-4 py-2 rounded-full text-white bg-[#16A34A] hover:bg-green-700 transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {routeList.map((route: RouteProps) => (
              <Link
                key={route.label}
                to={route.href}
                className="relative text-base font-normal text-[#3B3533] dark:text-white
        hover:text-[#16A34A] dark:hover:text-[#16A34A]
        after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[0.5px] after:bg-[#16A34A] after:transition-all hover:after:w-full opacity-95"
              >
                {route.label}
              </Link>
            ))}
            {/* Desktop Login button */}
            <Link
              to={RoutePaths.SIGN_IN}
              className="px-6 py-2 rounded-full text-white bg-[#16A34A] hover:bg-green-700 transition-colors text-sm ml-2"
            >
              Login
            </Link>

            {/* ThemeToggle */}
            {/* <ThemeToggle /> */}
          </nav>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
