import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

type Payment = {
  _id: string;
  transactionId: string;
  date: string;
  method: string;
  amount: number;
};

const PaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate fetching data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPayments([
        {
          _id: '1',
          transactionId: 'TXN-20251026-001',
          date: '2025-10-26 10:45 AM',
          method: 'Bkash',
          amount: 40,
        },
        {
          _id: '2',
          transactionId: 'TXN-20250915-002',
          date: '2025-09-15 03:22 PM',
          method: 'Bkash',
          amount: 40,
        },
        {
          _id: '3',
          transactionId: 'TXN-20250812-003',
          date: '2025-08-12 08:10 PM',
          method: 'Bkash',
          amount: 40,
        },
      ]);
      setLoading(false);
    }, 1000); // 1 second delay to simulate API call
  }, []);

  return (
    <div className="pb-20 pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Payment History</h1>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-300" />
            </div>
          ) : payments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No payment records found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                  List of all successful payments.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Amount (TK)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((pmt) => (
                    <TableRow key={pmt._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <TableCell className="font-mono">{pmt.transactionId}</TableCell>
                      <TableCell>{pmt.date}</TableCell>
                      <TableCell>{pmt.method}</TableCell>
                      <TableCell className="font-semibold text-green-600">TK. {pmt.amount}</TableCell>
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

export default PaymentHistory;
