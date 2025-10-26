import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import logo from '@/assets/pcc-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/Redux/Store';
import api from '@/Services/api';
import { SetUser, Logout } from '@/Redux/AuthSlice';
import { useState } from 'react';

export function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.Auth.user);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  //  Typed handleLogin
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
    const passwordInput = form.querySelector<HTMLInputElement>('input[name="password"]');

    const email = emailInput?.value.trim() || '';
    const password = passwordInput?.value || '';

    if (!email || !password) {
      setErrorMsg('Please fill in both fields');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await api.post('/api/auth/login', { email, password });

      if (response.status === 200) {
        const data = response.data;

        // 🔒 Prevent login if user is not active
        if (data.user?.status !== 'active') {
          setErrorMsg('Your account is pending approval. Please wait for admin verification.');
          return;
        }

        if (data.user?.role === 'admin') {
          dispatch(SetUser(data.user));
          navigate('/admin-dashboard');
        } else if (data.user?.role === 'student') {
          dispatch(SetUser(data.user));
          navigate('/user-dashboard');
        } else {
          setErrorMsg('Unauthorized access. Invalid role.');
        }
      }
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Login failed. Please try again.';
      setErrorMsg(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(Logout());
    navigate('/');
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="w-full bg-green-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center py-16 px-6">
          <img src={logo} alt="PCIU Computer Club Logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Welcome to the Website</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            The <span className="font-semibold text-green-700 dark:text-green-400">PCIU Computer Club</span> was founded
            to create a dynamic, inclusive, and innovative community for students passionate about technology,
            programming, and digital solutions.
          </p>
        </div>
      </section>

      {/* Login Form */}
      <section className="w-full bg-gray-50 dark:bg-gray-800">
        <div className="max-w-md mx-auto p-8">
          {user ? (
            <div className="space-y-3 text-center">
              <p className="text-gray-800 dark:text-gray-100">
                Logged in as <span className="font-semibold text-green-600 dark:text-green-400">{user.email}</span>
              </p>
              <Button variant="link" onClick={handleLogout} className="text-red-600 dark:text-red-400 underline">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">USER LOGIN</h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    name="email"
                    placeholder="Email"
                    className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-green-400 font-poppins"
                  />
                </div>

                <div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-green-400 font-poppins"
                  />
                </div>

                {errorMsg && <p className="text-red-500 text-sm text-center font-medium">{errorMsg}</p>}

                <div className="text-sm text-right text-green-700 dark:text-green-400">
                  <Link to="#" className="hover:text-green-900 dark:hover:text-green-200 font-poppins">
                    Forgot your Password?
                  </Link>
                </div>

                <Button type="submit" disabled={loading} className="w-full join-pcc-btn">
                  {loading ? 'Logging in...' : 'Login'}
                </Button>

                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  No account?{' '}
                  <Link to="/join" className="text-green-700 dark:text-green-400 font-semibold hover:underline">
                    Join Us!
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Social Login */}
      <section className="w-full bg-white dark:bg-gray-900 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <span className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></span>
            <span className="px-4 text-gray-500 dark:text-gray-400 text-sm font-poppins">Or continue with</span>
            <span className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></span>
          </div>

          <div className="flex justify-center gap-6">
            <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-green-50 dark:hover:bg-gray-700 transition">
              <FaFacebook className="text-blue-600 dark:text-blue-400 text-2xl" />
            </button>
            <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-green-50 dark:hover:bg-gray-700 transition">
              <FcGoogle className="text-2xl" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
