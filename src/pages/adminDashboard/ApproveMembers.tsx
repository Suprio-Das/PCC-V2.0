import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type MemberRequest = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  batch: string;
  department: string;
};

const ApproveMembers = () => {
  const [requests, setRequests] = useState<MemberRequest[]>([
    {
      id: 'R001',
      name: 'Anika Tasnin',
      email: 'anika@example.com',
      mobile: '01755555555',
      batch: '28-A',
      department: 'CSE',
    },
    {
      id: 'R002',
      name: 'Suprio Das',
      email: 'suprio@example.com',
      mobile: '01766666666',
      batch: '28-B',
      department: 'EEE',
    },
    {
      id: 'R003',
      name: 'Nusrat Jahan',
      email: 'nusrat@example.com',
      mobile: '01777777777',
      batch: '29-A',
      department: 'BBA',
    },
  ]);

  // Approve Member Handler
  const handleApprove = (id: string) => {
    const member = requests.find((r) => r.id === id);
    if (member) {
      toast.success(`${member.name} has been approved! (static mode)`);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Reject Member Handler
  const handleReject = (id: string) => {
    const member = requests.find((r) => r.id === id);
    if (member) {
      toast.error(`${member.name}'s request rejected! (static mode)`);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-6 dark:bg-gray-800 shadow-lg rounded-2xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Approve Member Requests</h1>

          {requests.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No new member requests.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg mt-6">
              <Table>
                <TableCaption>Pending member approval requests</TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell>{req.id}</TableCell>
                      <TableCell>{req.name}</TableCell>
                      <TableCell>{req.email}</TableCell>
                      <TableCell>{req.mobile}</TableCell>
                      <TableCell>{req.batch}</TableCell>
                      <TableCell>{req.department}</TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(req.id)}
                        >
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(req.id)}>
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ApproveMembers;
