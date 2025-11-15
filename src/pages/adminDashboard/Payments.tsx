import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

type Payment = {
  id: string;
  name: string;
  batch: string;
  transactionId: string;
  date: string;
};

const Payments = () => {
  const [payments] = useState<Payment[]>([
    {
      id: 'CSE 02807555',
      name: 'Jarin Tasnin Anika',
      batch: 'Batch 28',
      transactionId: 'TXN123456789',
      date: '2025-11-10T10:00:00.000Z',
    },
    {
      id: 'CSE 02807556',
      name: 'Suprio Das',
      batch: 'Batch 28',
      transactionId: 'TXN987654321',
      date: '2025-11-11T12:15:00.000Z',
    },
  ]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors font-grotesk">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Student Payments</h1>

          {payments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No payments recorded yet.</p>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block overflow-x-auto rounded-lg">
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <TableCaption className="text-gray-500 dark:text-gray-400">
                    List of recent student payments.
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-gray-700">
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p) => (
                      <TableRow
                        key={p.transactionId}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.batch}</TableCell>
                        <TableCell>{p.transactionId}</TableCell>
                        <TableCell>{formatDate(p.date)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile */}
              <div className="grid grid-cols-1 gap-4 md:hidden mt-6">
                {payments.map((p) => (
                  <Card key={p.transactionId} className="p-4 dark:bg-gray-800 shadow-sm">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-100">{p.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">ID: {p.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Batch: {p.batch}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Txn: {p.transactionId}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: {formatDate(p.date)}</p>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Payments;
