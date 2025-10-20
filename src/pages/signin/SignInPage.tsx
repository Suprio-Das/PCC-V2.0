import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from '@/providers/authProvider/authProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/types/route.type';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import logo from '@/assets/pcc-logo.png';

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export function SignInPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => navigate(RoutePaths.MEMBER_LIST))
      .catch(() => {});
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate(RoutePaths.SIGN_IN);
  };

  return (
    <>
      <Navbar />

      {/* Hero / Intro Section */}
      <section className="w-full bg-green-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center py-16 px-6">
          <img src={logo} alt="PCIU Computer Club Logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Welcome to the Website</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            The <span className="font-semibold text-green-700 dark:text-green-400">PCIU Computer Club</span> was founded
            to create a dynamic, inclusive, and innovative community for students passionate about technology,
            programming, and digital solutions. Our mission is to empower members through collaborative learning,
            hands-on projects, and networking with industry professionals.
          </p>
        </div>
      </section>

      {/* Login Form Section */}
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

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Username"
                            {...field}
                            className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-green-400 font-poppins"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Password"
                            type="password"
                            {...field}
                            className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-green-400 font-poppins"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="text-sm text-right text-green-700 dark:text-green-400">
                    <Link to="#" className="hover:text-green-900 dark:hover:text-green-200 font-poppins">
                      Forget your Password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full join-pcc-btn">
                    Login
                  </Button>

                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    No account?{' '}
                    <Link to="/join" className="text-green-700 dark:text-green-400 font-semibold hover:underline">
                      Join Us!
                    </Link>
                  </p>
                </form>
              </Form>
            </>
          )}
        </div>
      </section>

      {/* Social Login Section */}
      <section className="w-full bg-white dark:bg-gray-900 py-8">
        <div className="max-w-md mx-auto">
          {/* Divider */}
          <div className="flex items-center mb-6">
            <span className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></span>
            <span className="px-4 text-gray-500 dark:text-gray-400 text-sm font-poppins">Or continue with</span>
            <span className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></span>
          </div>

          {/* Social Buttons */}
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
