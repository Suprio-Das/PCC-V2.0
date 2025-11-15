import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '@/Services/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Student = {
  studentId: string;
  name: string;
  phone: string;
};

const RegisteredStudents = () => {
  const { id } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const event = location.state?.event;

  useEffect(() => {
    const fetchRegisteredStudents = async () => {
      try {
        const response = await api.get(`/api/admin/geteventregisteredstudents/${id}`);

        if (response.data.success) {
          setStudents(response.data.registeredStudents);
        } else {
          toast.error('Failed to load registered students');
        }
      } catch (error) {
        toast.error('Server error while fetching registered students');
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredStudents();
  }, [id]);

  return (
    <div className="pb-20 pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors sm:px-6 md:px-10">
      <div className="max-w-4xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 text-center">
            Registered Participants
          </h1>

          {event && (
            <>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Event Name: <span className="font-semibold">{event.title}</span>
              </p>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                Date: <span className="font-semibold">{event.date}</span>
              </p>
            </>
          )}

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-300" />
            </div>
          ) : students?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No one has registered yet.</p>
          ) : (
            <>
              {/* Large Devices Table */}
              <div className="hidden lg:block overflow-x-auto rounded-lg">
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-gray-700">
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students?.map((s, index) => (
                      <TableRow key={index}>
                        <TableCell>{s?.studentId}</TableCell>
                        <TableCell>{s?.name}</TableCell>
                        <TableCell>{s?.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="grid grid-cols-1 gap-4 mt-6 lg:hidden">
                {students?.map((s, index) => (
                  <Card key={index} className="p-4 dark:bg-gray-800 shadow-sm">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-100">{s.name}</h2>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">ID:</span> {s.studentId}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Phone:</span> {s.phone}
                    </p>
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

export default RegisteredStudents;
