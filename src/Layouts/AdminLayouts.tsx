import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/Redux/Store';

const AdminLayouts: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.Auth.user);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return <Outlet />;
};

export default AdminLayouts;
