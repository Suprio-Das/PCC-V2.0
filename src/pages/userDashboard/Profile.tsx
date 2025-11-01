import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import userLogo from '../../assets/user.jpg';
import api from '@/Services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.Auth.user);
  const [studentInfo, setStudentInfo] = useState<any>({});

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const info = await api.get(`/api/student/studentdetails/${user?.userId}`);
      if (info?.data?.success === true) {
        setStudentInfo(info.data.student);
      }
    };
    fetchStudentInfo();
  }, [user]);

  const handleUpdateStudentDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', studentInfo.name || '');
      formData.append('linkedin', studentInfo.linkedinprofile || '');
      formData.append('github', studentInfo.githubprofile || '');
      formData.append('bio', studentInfo.bio || '');
      if (studentInfo.profile instanceof File) {
        formData.append('profile', studentInfo.profile);
      }

      const response = await api.put(`/api/student/updatestudentdetails/${user?.userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        alert('Profile updated successfully!');
        setOpen(false);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Something went wrong while updating your profile.');
    }
  };

  return (
    <div className="pt-24 md:pt-32 md:pr-20 md:pl-[320px] min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors">
      <div className="flex flex-col items-center px-4 sm:px-6 md:w-[320px] mx-auto">
        {/* Avatar */}
        <div className="relative group w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 mb-5">
          <Avatar className="w-full h-full border-2 border-green-400 shadow-md rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <AvatarImage src={studentInfo?.profile || userLogo} />
          </Avatar>
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-green-600 opacity-5 group-hover:opacity-20 transition-opacity" />
        </div>

        {/* Profile Info */}
        <div className="text-center max-w-full">
          <h2 className="font-bold text-3xl sm:text-4xl mb-2 text-gray-800 dark:text-gray-100 truncate">
            {studentInfo?.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base break-words">
            {studentInfo?.bio}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm sm:text-base truncate">{studentInfo?.email}</p>

          {/* Social Links */}
          <div className="flex gap-4 mt-5 justify-center flex-wrap">
            {[studentInfo?.linkedinprofile, studentInfo?.githubprofile].map((link, idx) => {
              const icons = [FaLinkedin, FaGithub];
              const IconComp = icons[idx];
              return (
                <Link key={idx} to={link || '#'} target="_blank">
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 hover:text-gray-700 dark:hover:text-green-400 transition-colors" />
                </Link>
              );
            })}
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6 w-full sm:w-auto">
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)} className="w-full sm:w-auto join-pcc-btn">
                Edit Profile
              </Button>

              <DialogContent className="w-full sm:w-[400px] md:w-[450px] rounded-2xl font-grotesk max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-semibold font-garamond">Update Profile</DialogTitle>
                  <DialogDescription className="text-center text-gray-500 font-poppins">
                    Update your info to stay connected
                  </DialogDescription>
                </DialogHeader>

                <form className="grid gap-4 py-4 font-garamond" onSubmit={handleUpdateStudentDetails}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Label>Full Name</Label>
                      <Input
                        value={studentInfo?.name || ''}
                        onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                        className="text-gray-600 mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label>LinkedIn</Label>
                      <Input
                        value={studentInfo?.linkedinprofile || ''}
                        onChange={(e) => setStudentInfo({ ...studentInfo, linkedinprofile: e.target.value })}
                        className="text-gray-600 mt-2"
                      />
                    </div>
                    <div>
                      <Label>GitHub</Label>
                      <Input
                        value={studentInfo?.githubprofile || ''}
                        onChange={(e) => setStudentInfo({ ...studentInfo, githubprofile: e.target.value })}
                        className="text-gray-600 mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={studentInfo?.bio || ''}
                      onChange={(e) => setStudentInfo({ ...studentInfo, bio: e.target.value })}
                      className="text-gray-600 mt-2"
                    />
                  </div>

                  <div>
                    <Label>Profile Picture</Label>
                    <Input
                      type="file"
                      onChange={(e) => setStudentInfo({ ...studentInfo, profile: e.target.files?.[0] })}
                      className="w-full mt-2"
                    />
                  </div>

                  <DialogFooter>
                    <Button type="submit" className="w-full join-pcc-btn">
                      Update
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
