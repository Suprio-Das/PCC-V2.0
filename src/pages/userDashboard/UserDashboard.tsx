import { Navbar } from '@/components/Navbar';
import Sidebar from '@/components/user-dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

export const UserDashboard = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className=" flex">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};
