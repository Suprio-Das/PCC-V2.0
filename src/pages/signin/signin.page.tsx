import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/providers/authProvider/authProvider';
import { RoutePaths } from '@/types/route.type';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
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
        // Signed in
        navigate(RoutePaths.MEMBER_LIST);
        // ...
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
      <div className="container h-screen flex flex-col items-center justify-center">
        {user ? (
          <>
            Already logged in with <span className="text-primary">{user.email}</span>
            <Button onClick={handleLogout} variant={'link'} className="text-red-600 underline">
              Logout
            </Button>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center">
              <h1 className="text-xl font-semibold text-primary">PCIU Computer Club | Admin Login</h1>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="yourmail@mail.com" {...field} className="w-[256px]" />
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
                      <Input placeholder="Your Password" type="password" {...field} className="w-[256px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={'secondary'} className="px-6">
                Login
              </Button>
            </form>
          </Form>
        )}
      </div>
      <Footer />
    </>
  );
}
