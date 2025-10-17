import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/configs/firebase.config.js';
import DocumentTitle from '@/lib/documentTitle';
import { useAuth } from '@/providers/authProvider/authProvider';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Member {
  id: string;
  name?: string;
  universityID?: string;
  email?: string;
  paymentMethod?: string;
  phoneNumber?: string;
  transactionID?: string;
  expectation?: string;
  agreeTerms?: boolean;
  copied?: boolean;
  applicationProcessed?: boolean;
}

export function MemberListPage() {
  DocumentTitle('Member List');
  const [memberList, setMemberList] = useState<Member[]>([]);
  const { user } = useAuth();

  const getMembers = async () => {
    const querySnapShot = await getDocs(collection(db, 'members_summer2025'));
    const members: Member[] = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      copied: false,
      ...doc.data(),
    }));

    setMemberList(members);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="container flex flex-col gap-8 py-10">
      <header className="flex justify-between flex-wrap">
        <h1 className="text-center font-semibold text-2xl text-primary">PCC New Member Applicants - Summer 2025</h1>
        <h1 className="text-sm">
          Current user:{' '}
          <span className="text-red-400 text-base font-bold">{user?.email?.split('@')[0].toUpperCase()}</span>
        </h1>
      </header>
      <Table className="border border-slate-300 dark:border-slate-700">
        <TableCaption>This list is only visible to admins. Handle the data with confidentiality.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[144px]">Student ID</TableHead>
            <TableHead className="w-[144px]">Name</TableHead>
            <TableHead className="w-[144px]">Email</TableHead>
            <TableHead className="w-[144px]">Phone Number</TableHead>
            <TableHead className="w-[144px]">Payment Method</TableHead>
            <TableHead className="w-[144px]">TRX ID</TableHead>
            <TableHead className="w-[400px]">Expectation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberList.map((member, idx) => (
            <TableRow
              key={idx}
              className={`cursor-pointer ${member.paymentMethod === 'Handcash' && 'bg-background/200'}`}
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `${member.universityID}\t${member.name}\t${member.email}\t${member.phoneNumber}\t${member.paymentMethod}\t${member.transactionID}\t${member.expectation}`,
                );
                toast.success(`Copied: ${member.universityID}`);
                setTimeout(() => (member.copied = false), 2000);
              }}
            >
              <>
                <TableCell className="font-medium">{member.universityID}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phoneNumber}</TableCell>
                <TableCell>{member.paymentMethod}</TableCell>
                <TableCell>{member.transactionID ? member.transactionID : '-'}</TableCell>
                <TableCell>{member.expectation}</TableCell>
              </>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-center text-primary text-2xl" colSpan={7}>
              <div className="flex flex-col gap-2">
                Total Members: {memberList.length}
                <Button
                  className="w-full bg-secondary hover:bg-primary/20 text-foreground"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      memberList
                        .map(
                          (member) =>
                            `${member.universityID}\t${member.name}\t${member.email}\t${member.phoneNumber}\t${member.paymentMethod}\t${member.transactionID}\t${member.expectation}`,
                        )
                        .join('\n'),
                    );

                    toast.success('All Member Info Copied');
                  }}
                >
                  Copy All
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Toaster richColors />
    </div>
  );
}
