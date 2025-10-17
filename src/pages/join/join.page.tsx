import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { NotRecruiting } from '@/components/shared/notRecruiting';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { Badge } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);

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
            <div className="py-8 lg:py-2 container space-y-4 max-w-lg mx-auto">
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full md:w-60vw lg:w-30vw">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-8 w-full justify-between">
                    <FormField
                      control={form.control}
                      name="universityID"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="font-semibold">University ID *</FormLabel>
                          <FormControl>
                            <Input placeholder="CSE 123 45678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Payment Method *&nbsp;&#40;
                          <Dialog>
                            <DialogTrigger asChild>
                              <span className=" text-slate-400 text-xs cursor-pointer">See Payment Instructions</span>
                            </DialogTrigger>
                            <DialogContent className="w-90vw rounded-md sm:max-w-md overflow-y-auto max-h-screen">
                              <DialogHeader>
                                <DialogTitle>PCC Joining Fee Payment Instructions</DialogTitle>
                                <DialogDescription>The joining fee is BDT 100. </DialogDescription>
                              </DialogHeader>
                              <div className="flex flex-col items-start gap-2">
                                {/* Dialog description here */}
                                <h1 className="w-full font-semibold text-primary text-center">Paying Hand Cash</h1>
                                <span className="">
                                  <span className="flex gap-2 items-center justify-start text-sm">
                                    <Badge className="w-2 h-2 text-primary" />
                                    Contact Your Section Representative
                                  </span>
                                </span>
                                <h1 className="w-full font-semibold text-primary text-center">
                                  Paying with Bkash/Nagad
                                </h1>
                                <span className="flex flex-col gap-1">
                                  <span className="flex gap-2 items-center justify-start text-sm">
                                    <Badge className="w-2 h-2 text-primary" />
                                    Go to Bkash/Nagad
                                  </span>
                                  <span className="flex gap-2 items-center justify-start text-sm">
                                    <Badge className="w-2 h-2 text-primary" />
                                    <span>
                                      Send Money to&nbsp;
                                      <span
                                        className="bg-slate-300 dark:bg-slate-900 px-1 py-[1px] rounded-sm cursor-pointer"
                                        onClick={async () => {
                                          await navigator.clipboard.writeText(`01973773627`);
                                          toast.success(`Number Copied`);
                                          setCopied(true);
                                          setTimeout(() => setCopied(false), 2000);
                                        }}
                                      >
                                        01973773627&nbsp;
                                        {!copied ? (
                                          <Icon icon={'cuida:copy-outline'} />
                                        ) : (
                                          <Icon icon={'ic:outline-done'} />
                                        )}
                                      </span>
                                    </span>
                                  </span>
                                  <span className="flex gap-2 items-center justify-start text-sm">
                                    <Badge className="w-2 h-2 text-primary" />
                                    Copy the Transaction ID
                                  </span>
                                  <span className="flex gap-2 items-center justify-start text-sm">
                                    <Badge className="w-2 h-2 text-primary" />
                                    You&apos;re done!
                                  </span>
                                </span>
                              </div>
                              <DialogFooter className="flex flex-row justify-end">
                                <DialogClose asChild className="justify-end">
                                  <Button type="button" variant="outline" className="w-fit">
                                    Close
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          &#41;
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Payment Method" />
                              </SelectTrigger>
                            </FormControl>
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
                      <FormItem>
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
                      <FormItem className="flex flex-col">
                        <div className="flex flex-row items-start space-y-0 space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>

                          <FormDescription className="leading-none">
                            I agree to PCIU Computer Club&apos;s&nbsp;
                            <Dialog>
                              <DialogTrigger asChild>
                                <span className="underline text-primary cursor-pointer">Monthly Fee Policy</span>
                              </DialogTrigger>
                              <DialogContent className="w-90vw rounded-md sm:max-w-md overflow-y-auto max-h-screen">
                                <DialogHeader>
                                  <DialogTitle>PCC Monthly Fees Policy</DialogTitle>
                                  {/* <DialogDescription>
                                    PCIU Computer Club members must pay 
                                  </DialogDescription> */}
                                </DialogHeader>
                                <div className="flex flex-col items-start gap-2">
                                  {/* Dialog description here */}
                                  <span className="flex flex-col gap-2">
                                    <span className="flex gap-2 items-center justify-start text-sm">
                                      <Icon icon={'ion:arrow-redo'} className="text-primary" />
                                      Each month, a fee of BDT 40 will be charged to all members to support club
                                      activities, events, and resources.
                                    </span>
                                    <span className="flex gap-2 items-center justify-start text-sm">
                                      <Icon icon={'ion:arrow-redo'} className="text-primary" />
                                      Membership fees provide reduced entry fees for certain club events and special
                                      sessions. However, bigger events may require specific contribution from the
                                      participants.
                                    </span>
                                    <span className="flex gap-2 items-center justify-start text-sm">
                                      <Icon icon={'ion:arrow-redo'} className="text-primary" />
                                      Fees can be paid via Hand Cash, Bkash and Nagad.
                                    </span>
                                    <span className="flex gap-2 items-center justify-start text-sm">
                                      <Icon icon={'ion:arrow-redo'} className="text-primary" />
                                      Monthly fees are non-refundable, as they are used for ongoing club activities.
                                    </span>
                                  </span>
                                </div>
                                <DialogFooter className="flex flex-row justify-end">
                                  <DialogClose asChild className="justify-end">
                                    <Button type="button" variant="outline" className="w-fit">
                                      Close
                                    </Button>
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

                  <Button type="submit" disabled={false} className="w-[96px]">
                    {!loading && <>Submit</>}
                    {loading && <ThreeDots width={'24px'} height={'8px'} color="#fff" />}
                  </Button>
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
