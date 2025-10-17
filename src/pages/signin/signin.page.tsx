import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/providers/authProvider/authProvider';
import { RoutePaths } from '@/types/route.type';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export function SignInPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate(RoutePaths.MEMBER_LIST);
      })
      .catch(() => {});
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      if (error instanceof Error) {
        navigate(RoutePaths.SIGN_IN);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container min-h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white dark:bg-black rounded-xl overflow-hidden shadow-md">
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
            <div>
              <h1 className="text-center lg:text-3xl font-semibold">Let’s Build the Future Together</h1>
              <p className="w-4/5 text-center mx-auto mt-3">
                Log in to access your community of tech enthusiasts. Participate in workshops, hackathons, and projects
                that shape tomorrow’s innovators.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-8 lg:p-16">
            {user ? (
              <div className="text-center space-y-3">
                <p>
                  Already logged in with <span className="text-primary font-semibold">{user.email}</span>
                </p>
                <Button onClick={handleLogout} variant={'link'} className="text-red-600 underline">
                  Logout
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6 flex flex-col">
                  <h1 className="text-4xl font-semibold text-primary text-center">Login</h1>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="yourmail@mail.com" {...field} />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" variant={'secondary'} className="w-full">
                    Login
                  </Button>
                  <h1 className="mx-auto">
                    No Account?{' '}
                    <Link to="/join" className="font-semibold text-primary">
                      Join US!
                    </Link>
                  </h1>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
