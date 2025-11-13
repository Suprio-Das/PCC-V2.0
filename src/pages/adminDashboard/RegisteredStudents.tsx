import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RegisteredStudents = () => {
  const registrations = [
    { id: 'CSE 02807555', name: 'Jarin Tasnin Anika', phone: '017XXXXXXXX' },
    { id: 'CSE 02807556', name: 'Suprio Das', phone: '018XXXXXXXX' },
  ];

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
            Registered Participants for Event
          </h1>

          {registrations.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No one has registered yet.</p>
          ) : (
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-700">
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg, index) => (
                  <TableRow key={index}>
                    <TableCell>{reg.id}</TableCell>
                    <TableCell>{reg.name}</TableCell>
                    <TableCell>{reg.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RegisteredStudents;
