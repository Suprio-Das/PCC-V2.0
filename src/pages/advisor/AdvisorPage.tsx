import { Navbar } from '@/components/Navbar';

export const AdvisorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container py-10">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Advisor Page</h2>
        <p className="text-center text-gray-600">This is the full advisor list and details section.</p>
      </div>
    </div>
  );
};
