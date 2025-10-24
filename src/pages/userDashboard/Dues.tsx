import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

// Type for monthly club dues
type Due = {
  _id: string;
  month: string; // New field
  amount: number;
  status: 'Pending' | 'Paid';
};

const Dues = () => {
  // Static/dummy monthly dues
  const [dues, setDues] = useState<Due[]>([
    { _id: '1', month: 'October 2025', amount: 40, status: 'Paid' },
    { _id: '2', month: 'November 2025', amount: 40, status: 'Pending' },
    { _id: '3', month: 'December 2025', amount: 40, status: 'Pending' },
  ]);

  const payDue = (id: string) => {
    setDues(dues.map((due) => (due._id === id ? { ...due, status: 'Paid' } : due)));
    toast.success('Payment successful (static mode)');
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Monthly Club Fees</h1>

          {dues.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No dues found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                  List of monthly club fees and their payment status.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead>Month</TableHead>
                    <TableHead>Amount ($)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dues.map((due) => (
                    <TableRow key={due._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <TableCell>{due.month}</TableCell>
                      <TableCell>{due.amount}</TableCell>
                      <TableCell
                        className={`font-semibold ${due.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {due.status}
                      </TableCell>
                      <TableCell className="text-center">
                        {due.status === 'Pending' ? (
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => payDue(due._id)}
                          >
                            Pay Now
                          </Button>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
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

export default Dues;
