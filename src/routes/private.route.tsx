import { SignInPage } from '@/pages/signin/SignInPage';
import { useAuth } from '@/providers/authProvider/authProvider';
import { Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const { user, loading } = useAuth();
  return loading ? <> Loading... </> : user ? <Outlet /> : <SignInPage />;
};
