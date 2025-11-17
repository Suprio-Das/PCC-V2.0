import { Navbar } from '@/components/Navbar';
import Sidebar from '@/components/user-dashboard/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export const UserDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar onToggle={setIsCollapsed} />

        <div
          className={`
            flex-1 transition-all duration-300
            ${isCollapsed ? 'md:pl-20' : 'md:pl-[260px]'}
          `}
        >
          <Outlet />
        </div>
        <Toaster richColors />
      </div>
    </>
  );
};
