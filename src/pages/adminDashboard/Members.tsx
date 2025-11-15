import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const Members = () => {
  const batches = [
    { id: '28-A', name: 'Batch 28-A' },
    { id: '28-B', name: 'Batch 28-B' },
    { id: '28-C', name: 'Batch 28-C' },
    { id: '29-A', name: 'Batch 29-A' },
  ];

  const membersData: Record<string, { id: string; name: string; email: string; mobile: string; due: number }[]> = {
    '28-A': [
      { id: 'M001', name: 'Rahim Uddin', email: 'rahim@example.com', mobile: '01711111111', due: 200 },
      { id: 'M002', name: 'Karim Ali', email: 'karim@example.com', mobile: '01722222222', due: 0 },
    ],
    '28-B': [{ id: 'M010', name: 'Anika Tasnin', email: 'anika@example.com', mobile: '01755555555', due: 100 }],
  };

  const [selectedBatch, setSelectedBatch] = useState<string>('');

  return (
    <div className="pb-20 pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-6 space-y-4 dark:bg-gray-800 shadow-lg rounded-2xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Club Members</h1>

          {/* Batch Selector */}
          <Select onValueChange={(value) => setSelectedBatch(value)}>
            <SelectTrigger className="w-full md:w-1/3 mx-auto">
              <SelectValue placeholder="Select Batch & Section" />
            </SelectTrigger>
            <SelectContent>
              {batches.map((batch) => (
                <SelectItem key={batch.id} value={batch.id}>
                  {batch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Members Section */}
          {selectedBatch && membersData[selectedBatch] ? (
            <>
              {/* Large Device Table */}
              <div className="hidden lg:block overflow-x-auto rounded-lg mt-6">
                <Table>
                  <TableCaption>List of members in {selectedBatch}</TableCaption>
                  <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-gray-700">
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead className="text-center">Total Dues (৳)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {membersData[selectedBatch].map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>{m.id}</TableCell>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.email}</TableCell>
                        <TableCell>{m.mobile}</TableCell>
                        <TableCell className="text-center font-semibold">
                          {m.due > 0 ? (
                            <span className="text-red-500">৳{m.due}</span>
                          ) : (
                            <span className="text-green-500">No Due</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Medium & Small Device Cards */}
              <div className="grid grid-cols-1 gap-4 mt-6 lg:hidden">
                {membersData[selectedBatch].map((m) => (
                  <Card
                    key={m.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="font-semibold text-gray-800 dark:text-gray-100">{m.name}</h2>
                      <span className={`text-sm font-medium ${m.due > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {m.due > 0 ? `৳${m.due}` : 'No Due'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">ID:</span> {m.id}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Email:</span> {m.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Mobile:</span> {m.mobile}
                    </p>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-6">Select a batch to view members.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Members;
