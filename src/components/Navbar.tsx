import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import PCCLogo from '@/assets/pcc-logo.png';
import { buttonVariants } from './ui/button';
import { RoutePaths } from '@/types/route.type';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './customized/ThemeToggle/ThemeToggle';
import { LogOut, ChartBar, PencilLine, UserRound } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/Redux/Store';
import { Logout } from '@/Redux/AuthSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import userLogo from '@/assets/user.jpg';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiHistoryLine } from 'react-icons/ri';
import { MdOutlinePayment } from 'react-icons/md';
import { BsCalendar2Event } from 'react-icons/bs';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FiUsers } from 'react-icons/fi';
import { GoGitPullRequest } from 'react-icons/go';

interface RouteProps {
  href: string;
  label: string;
}

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  photoUrl?: string;
  location?: string;
}

const routeList: RouteProps[] = [
  { href: RoutePaths.TIMELINE, label: 'Timeline' },
  { href: RoutePaths.ABOUT, label: 'About' },
  { href: RoutePaths.BLOG, label: 'Blog' },
  { href: RoutePaths.EVENTS, label: 'Events' },
  { href: RoutePaths.CONTACT, label: 'Contact Us' },
];

// Role-based menu generator
const getMenuItems = (role: string) => {
  if (role === 'admin') {
    return [
      { path: '/admin-dashboard/dashboard', label: 'Dashboard', icon: <LuLayoutDashboard size={20} /> },
      { path: '/admin-dashboard/events', label: 'Events', icon: <BsCalendar2Event size={18} /> },
      { path: '/admin-dashboard/create-events', label: 'Create Events', icon: <PencilLine size={20} /> },
      { path: '/admin-dashboard/approve-blogs', label: 'Approve Blogs', icon: <ChartBar size={20} /> },
      { path: '/admin-dashboard/members', label: 'Members', icon: <FiUsers size={20} /> },
      { path: '/admin-dashboard/approve-members', label: 'Approve Members', icon: <GoGitPullRequest size={20} /> },
      { path: '/admin-dashboard/settings', label: 'Settings', icon: <IoSettingsOutline size={20} /> },
    ];
  } else if (role === 'student') {
    return [
      { path: '/user-dashboard/profile', label: 'Profile', icon: <UserRound size={20} /> },
      { path: '/user-dashboard/registered-events', label: 'Events', icon: <BsCalendar2Event size={18} /> },
      { path: '/user-dashboard/your-blog', label: 'Your Blogs', icon: <ChartBar size={20} /> },
      { path: '/user-dashboard/write-blog', label: 'Write Blog', icon: <PencilLine size={20} /> },
      { path: '/user-dashboard/dues', label: 'Make Payment', icon: <MdOutlinePayment size={20} /> },
      { path: '/user-dashboard/payment-history', label: 'Payment History', icon: <RiHistoryLine size={20} /> },
      { path: '/user-dashboard/settings', label: 'Settings', icon: <IoSettingsOutline size={20} /> },
    ];
  }
  return [];
};

export const Navbar = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.Auth.user) as UserType | null;

  const logoutHandler = () => {
    dispatch(Logout());
  };

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

          {/* Mobile Menu + Avatar */}
          <div className="flex md:hidden items-center gap-4">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-green-600">
                    <AvatarImage src={user.photoUrl || userLogo} />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 dark:bg-gray-900 bg-white shadow-xl rounded-2xl p-2" align="end">
                  <DropdownMenuLabel className="text-center font-semibold text-lg border-b pb-2">
                    {user.name || 'My Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuGroup className="mt-2 flex flex-col gap-1">
                    {getMenuItems(user.role).map((item) => (
                      <DropdownMenuItem
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                      >
                        {item.icon}
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition-all duration-200"
                  >
                    <LogOut size={20} /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Hamburger Menu */}
            <Sheet open={openNav} onOpenChange={setOpenNav}>
              <SheetTrigger asChild>
                {openNav ? (
                  <HiMenuAlt3 className="w-7 h-7 cursor-pointer" />
                ) : (
                  <HiMenuAlt1 className="w-7 h-7 cursor-pointer" />
                )}
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">PCC</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => {
                    const isActive = location.pathname === href;
                    return (
                      <Link
                        key={label}
                        to={href}
                        onClick={() => setOpenNav(false)}
                        className={`${buttonVariants({ variant: 'ghost' })} ${isActive ? 'text-[#16A34A]' : ''}`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                  {!user && (
                    <Link
                      to={RoutePaths.SIGN_IN}
                      className="px-4 py-2 rounded-full text-white bg-[#16A34A] hover:bg-green-700 transition-colors font-medium mt-3"
                      onClick={() => setOpenNav(false)}
                    >
                      Login
                    </Link>
                  )}
                  <ThemeToggle />
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-poppins">
            {routeList.map((route: RouteProps) => {
              const isActive = location.pathname === route.href;
              return (
                <Link
                  key={route.label}
                  to={route.href}
                  className={`relative text-sm font-normal
                    ${isActive ? 'text-[#16A34A]' : 'text-[#3B3533] dark:text-white'}
                    hover:text-[#16A34A] dark:hover:text-[#16A34A]
                    after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[0.5px] after:bg-[#16A34A] after:transition-all hover:after:w-full opacity-95
                  `}
                >
                  {route.label}
                </Link>
              );
            })}

            {/* Desktop Login/User */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-green-600">
                    <AvatarImage src={user.photoUrl || userLogo} />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 dark:bg-gray-900 bg-white shadow-xl rounded-2xl p-2" align="end">
                  <DropdownMenuLabel className="text-center font-semibold text-lg border-b pb-2">
                    {user.name || 'My Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuGroup className="mt-2 flex flex-col gap-1">
                    {getMenuItems(user.role).map((item) => (
                      <DropdownMenuItem
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                      >
                        {item.icon}
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem onClick={logoutHandler} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to={RoutePaths.SIGN_IN}
                className="px-6 py-2 rounded-full text-white bg-[#16A34A] hover:bg-green-700 transition-colors text-sm ml-2"
              >
                Login
              </Link>
            )}

            <ThemeToggle />
          </nav>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
