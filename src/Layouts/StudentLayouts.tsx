import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/Redux/Store';

const StudentLayouts: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.Auth.user);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'student') {
    return null;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default StudentLayouts;
