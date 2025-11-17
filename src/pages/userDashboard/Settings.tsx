import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
// import axios from 'axios';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      setLoading(true);

      // Static mode: just show success
      toast.success('Password changed successfully (static mode)');

      // Dynamic mode: call backend API
      // const res = await axios.post('/api/user/change-password', {
      //   currentPassword,
      //   newPassword
      // }, { withCredentials: true });
      // if(res.data.success) toast.success("Password updated successfully");

      // Reset fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      //   console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen sm:px-6 md:px-10">
      <div className="max-w-3xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-6 space-y-6 dark:bg-gray-800 shadow-lg rounded-xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">Account Settings</h1>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-gray-700 dark:text-gray-300">Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700 dark:text-gray-300">New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleChangePassword} disabled={loading} className="join-pcc-btn">
                {loading ? 'Saving...' : 'Change Password'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
