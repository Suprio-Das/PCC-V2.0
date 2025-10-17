import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { NotRecruiting } from '@/components/shared/notRecruiting';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DocumentTitle from '@/lib/documentTitle';
import { zodResolver } from '@hookform/resolvers/zod';
// import { Badge } from 'lucide-react';
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

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'This field is required' }),

    email: z
      .string()
      .min(1, { message: 'This field is required' })
      .email('Please enter a valid email')
      .max(320, 'Too long email address')
      .regex(
        new RegExp(
          /^[a-zA-Z0-9._-]+@(portcity.edu.bd|gmail.com|hotmail.com|outlook.com|yahoo.com|yandex.com|live.com|protonmail.com)$/,
        ),
        {
          message: 'Please enter your personal or university email',
        },
      ),

    phone: z.object({
      countryCode: z.string(),

      number: z
        .string()
        .min(1, { message: 'This field is required' })
        .regex(new RegExp(/^\s*(\d\s*){11}\s*$/), {
          message: 'Please enter an 11-digit mobile number',
        }),
    }),

    department: z.string(),

    universityID: z
      .string()
      .min(1, { message: 'This field is required' })
      .regex(new RegExp(/^\s*[Cc]\s*[Ss]\s*[Ee].*$/), {
        message: 'Only students from the dept. of CSE are eligible to join',
      })
      .regex(new RegExp(/^\s*[Cc]\s*[Ss]\s*[Ee]\s*(\d\s*){8}\s*$/), {
        message: 'Please enter a valid student ID',
      }),

    batch: z.number().optional(),

    payment: z.object({
      method: z.enum(['Bkash', 'Nagad', 'Handcash'], { message: 'Unsupported Payment Method' }),

      transaction_id: z.string().optional(),
    }),

    expectation: z.string().optional(),

    agreeTerms: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
        message: 'You must agree to the terms before joining',
      }),
    applicationProcessed: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.payment.method !== 'Handcash') {
        return !!data.payment.transaction_id;
      }
      return true;
    },
    {
      message: 'Transaction ID is required',
      path: ['payment.transaction_id'],
    },
  );

export const JoinPage = () => {
  DocumentTitle('Join PCC');
  const [loading, setLoading] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: {
        countryCode: '+88',
        number: '',
      },
      department: 'CSE',
      universityID: '',
      batch: 0,
      payment: {
        method: 'Handcash',
        transaction_id: '',
      },
      expectation: '',
      agreeTerms: false,
      applicationProcessed: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    //phone number formatting
    let unFormattedPhoneNumber: string = values.phone.number;
    let formattedPhoneNumber: string = '';
    while (unFormattedPhoneNumber.length > 0) {
      unFormattedPhoneNumber = unFormattedPhoneNumber.trim();
      formattedPhoneNumber = `${formattedPhoneNumber}${unFormattedPhoneNumber.charAt(0)}`;
      unFormattedPhoneNumber = unFormattedPhoneNumber.slice(1);
    }

    values.phone.number = formattedPhoneNumber;

    //universityID formatting
    let unFormattedUniversityID: string = values.universityID.toUpperCase();
    let formattedUniversityID: string = '';
    while (unFormattedUniversityID.length > 0) {
      if (formattedUniversityID.length == 3) {
        formattedUniversityID = `${formattedUniversityID} `;
      }
      if (formattedUniversityID.length == 7) {
        formattedUniversityID = `${formattedUniversityID} `;
      }

      unFormattedUniversityID = unFormattedUniversityID.trim();
      formattedUniversityID = `${formattedUniversityID}${unFormattedUniversityID.charAt(0)}`;
      unFormattedUniversityID = unFormattedUniversityID.slice(1);
    }

    values.universityID = formattedUniversityID;

    //checking duplicate
    const docRef = doc(db, 'members_summer2025', values.universityID);
    const docSnap = getDoc(docRef);

    if ((await docSnap).exists()) {
      toast.error(
        `You are already registered to PCIU Computer Club. If you think there's a mistake, contact your Section Representative.`,
      );
    } else {
      try {
        await setDoc(docRef, {
          universityID: values.universityID,
          name: values.name,
          email: values.email,
          phoneNumber: values.phone.number,
          paymentMethod: values.payment.method,
          transactionID: values.payment.transaction_id,
          expectation: values.expectation,
          agreeTerms: true,
          applicationProcessed: false,
        });

        //user created.
        setJoinSuccess(true);
      } catch (error: unknown) {
        toast.error('Something Went Wrong.');
      }
    }

    setLoading(false);
  }

  const recruitmentOngoing = true;
  const paymentMethod = form.watch('payment.method');
  // const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [copied, setCopied] = useState(false);

  return (
    <>
      <Navbar />
      {!recruitmentOngoing && <NotRecruiting />}
      {recruitmentOngoing && (
        <>
          {joinSuccess ? (
            <div className="h-[80vh] container flex flex-col gap-4 items-center justify-center">
              <Icon icon={'line-md:confirm-circle'} className="text-7xl text-primary " />
              <div className="text-center flex flex-col gap-4 max-w-7xl">
                <h1 className="font-semibold text-3xl">You&apos;re In!</h1>
                <p className="max-w-xl">
                  You&apos;ve successfully registered for joining PCIU Computer Club. You will be notified when your
                  membership is verified. Thank you.
                </p>
              </div>
              {/* <div className="py-4">
                <Button variant={"secondary"} className={`px-6 border border-primary`}>
                  Done
                </Button>
              </div> */}
            </div>
          ) : (
            <div className="py-8 lg:py-2 container space-y-4 max-w-2xl mx-auto">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-center">Join PCIU Computer Club</h2>
                <Accordion type="single" defaultValue="instructions" collapsible>
                  <AccordionItem value="instructions">
                    <AccordionTrigger className="text-sm">Important Instructions</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-left max-w-md">
                        <p className="flex">
                          <Icon icon={'gis:copy-point'} className="text-xl text-primary" />
                          Please fill up your details with correct information
                        </p>
                        <p className="flex">
                          <Icon icon={'gis:copy-point'} className="text-xl text-primary" />
                          &apos;*&apos; in the label defines the field as required
                        </p>
                        <p className="flex">
                          <Icon icon={'gis:copy-point'} className="text-xl text-primary" />
                          Joining Fee: BDT 100
                        </p>
                        <p className="flex">
                          <Icon icon={'gis:copy-point'} className="text-xl text-primary" />
                          Last date for joining: August 25, 2025
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-700 transition-all duration-300"
                >
                  <div className="col-span-1 md:col-span-2 text-center mb-4">
                    <h2 className="text-2xl font-semibold text-primary">Join PCIU Computer Club</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fill in your details carefully to become part of our growing tech community.
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Full Name *</FormLabel>
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
                        <FormLabel className="font-semibold">University ID *</FormLabel>
                        <FormControl>
                          <Input placeholder="CSE 123 45678" {...field} />
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
                        <FormLabel className="font-semibold">Email *</FormLabel>
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
                        <FormLabel className="font-semibold">Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="01XXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="payment.method"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className="font-semibold">Payment Method *</FormLabel>
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
                        <FormItem>
                          <FormLabel className="font-semibold">Transaction ID *</FormLabel>
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
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className="font-semibold">Expectations from PCC</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write what you expect from PCIU Computer Club..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <div className="flex flex-row items-start gap-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormDescription className="leading-tight">
                            I agree to PCIU Computer Club&apos;s{' '}
                            <Dialog>
                              <DialogTrigger asChild>
                                <span className="underline text-primary cursor-pointer">Monthly Fee Policy</span>
                              </DialogTrigger>
                              <DialogContent className="w-90vw rounded-md sm:max-w-md overflow-y-auto max-h-screen">
                                <DialogHeader>
                                  <DialogTitle>PCC Monthly Fees Policy</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-2 text-sm">
                                  <p>• A fee of BDT 40 will be charged monthly to support club activities.</p>
                                  <p>• Fees are non-refundable and used for ongoing development.</p>
                                  <p>• Payments can be made via Hand Cash, Bkash, or Nagad.</p>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Close</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            .
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-1 md:col-span-2 flex justify-center pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-2 w-40 text-white bg-primary hover:bg-primary/90 transition-all duration-200"
                    >
                      {!loading ? 'Submit' : <ThreeDots width="24px" height="8px" color="#fff" />}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </>
      )}
      <Footer />
      <Toaster richColors />
    </>
  );
};
