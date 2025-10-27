import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { NotRecruiting } from '@/components/shared/notRecruiting';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DocumentTitle from '@/lib/documentTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Toaster } from '@/components/ui/sonner';
import { db } from '@/configs/firebase.config.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Icon } from '@iconify/react';

const formSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .email('Please enter a valid email')
    .max(320, 'Too long email address'),
  phone: z.object({
    countryCode: z.string(),
    number: z
      .string()
      .min(1, { message: 'This field is required' })
      .regex(/^\s*(\d\s*){11}\s*$/, { message: 'Please enter an 11-digit mobile number' }),
  }),
  universityID: z.string().min(1, { message: 'This field is required' }),

  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  batch: z.string().min(1, { message: 'Batch is required' }),
  section: z
    .string()
    .min(1, { message: 'Section is required' })
    .max(1, { message: 'Section must be 1 character only' }),
  shift: z.enum(['D', 'E'], { message: 'Shift must be D or E' }),

  payment: z.object({
    method: z.enum(['Bkash', 'Nagad', 'Handcash'], { message: 'Unsupported Payment Method' }),
    transaction_id: z.string().optional(),
  }),
  expectation: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, { message: 'You must agree to the terms' }),
});

export const JoinPage = () => {
  DocumentTitle('Join PCC');
  const [loading, setLoading] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: { countryCode: '+88', number: '' },
      universityID: '',
      password: '',
      batch: '',
      section: '',
      shift: 'D',
      payment: { method: 'Handcash', transaction_id: '' },
      expectation: '',
      agreeTerms: false,
    },
  });

  const paymentMethod = form.watch('payment.method');
  const recruitmentOngoing = true;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    values.phone.number = values.phone.number.replace(/\s+/g, '');
    values.universityID = values.universityID.toUpperCase().replace(/\s+/g, '');

    const docRef = doc(db, 'members_summer2025', values.universityID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      toast.error('You are already registered. Contact your Section Rep.');
    } else {
      try {
        await setDoc(docRef, {
          ...values,
          agreeTerms: true,
          applicationProcessed: false,
        });
        setJoinSuccess(true);
      } catch {
        toast.error('Something went wrong.');
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      {!recruitmentOngoing && <NotRecruiting />}
      {recruitmentOngoing && (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-3xl mx-auto px-4">
            {joinSuccess ? (
              <div className="flex flex-col items-center justify-center gap-6 h-96 text-center">
                <Icon icon="line-md:confirm-circle" className="text-7xl text-primary" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">You are In!</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Successfully registered for PCIU Computer Club. You will be notified after verification.
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-700 p-8 space-y-6 transition-all duration-300">
                <h2 className="text-2xl font-bold text-center text-green-700">Join PCIU Computer Club</h2>

                <Accordion type="single" defaultValue="instructions" collapsible>
                  <AccordionItem value="instructions">
                    <AccordionTrigger>Important Instructions</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 font-poppins text-sm">
                        <li>Fill in all required details correctly.</li>
                        <li>Joining fee: BDT 100</li>
                        <li>Deadline: October 21, 2025</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="universityID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>University ID *</FormLabel>
                          <FormControl>
                            <Input placeholder="CSE 12345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="batch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Batch *</FormLabel>
                          <FormControl>
                            <Input maxLength={2} placeholder="e.g. 28" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="section"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Section *</FormLabel>
                          <FormControl>
                            <Input maxLength={1} placeholder="A" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shift"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shift *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Shift" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="D">Day</SelectItem>
                                <SelectItem value="E">Evening</SelectItem>
                              </SelectContent>
                            </Select>
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
                          <FormLabel>Password *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                {...field}
                              />
                              <Icon
                                icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="youremail@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone.number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              placeholder="01XXXXXXXXX"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Section */}
                    <FormField
                      control={form.control}
                      name="payment.method"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Payment Method *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Payment Method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Handcash">Hand Cash</SelectItem>
                                <SelectItem value="Bkash">Bkash</SelectItem>
                                <SelectItem value="Nagad">Nagad</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentMethod !== 'Handcash' && (
                      <FormField
                        control={form.control}
                        name="payment.transaction_id"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Transaction ID *</FormLabel>
                            <FormControl>
                              <Input placeholder={`${paymentMethod}_Transaction_ID`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="expectation"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Expectations from PCC</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Write your expectations..." className="resize-none" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeTerms"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <div className="flex items-start gap-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              I agree to PCIU Monthly Fee Policy
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="md:col-span-2 flex justify-center">
                      <Button type="submit" disabled={loading} className="w-40 join-pcc-btn">
                        {!loading ? 'Submit' : <ThreeDots width="24px" height="8px" color="#fff" />}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
      <Toaster richColors />
    </>
  );
};
