import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type Due = {
  _id: string;
  month: string;
  amount: number;
  status: 'Pending' | 'Paid';
};

const MakePayment = () => {
  const [dues, setDues] = useState<Due[]>([
    { _id: '1', month: 'October 2025', amount: 40, status: 'Paid' },
    { _id: '2', month: 'November 2025', amount: 40, status: 'Pending' },
    { _id: '3', month: 'December 2025', amount: 40, status: 'Pending' },
  ]);

  const pendingDues = dues.filter((d) => d.status === 'Pending');
  const totalDue: number = pendingDues.reduce((sum, d) => sum + d.amount, 0);

  const payAllDues = () => {
    if (pendingDues.length === 0) return;
    const updatedDues: Due[] = dues.map((d) => ({ ...d, status: 'Paid' }));
    setDues(updatedDues);
    toast.success('All pending dues have been paid (static mode)');
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-8 space-y-6 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Club Fees</h1>

          {totalDue > 0 ? (
            <>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                You have <span className="font-semibold text-red-600">{pendingDues.length}</span> pending{' '}
                {pendingDues.length > 1 ? 'months' : 'month'} of dues.
              </p>

              <div className="text-4xl font-bold text-green-600 dark:text-green-400 my-4">TK. {totalDue}</div>

              <Button
                onClick={payAllDues}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-all"
              >
                Pay Now
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                You have no dues! Everything is paid.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MakePayment;
