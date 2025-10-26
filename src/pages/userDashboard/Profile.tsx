import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
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

const Profile = () => {
  const [open, setOpen] = useState(false);

  // Static user info
  const user = {
    firstName: 'Jarin',
    lastName: 'Anika',
    bio: 'Undergraduate student and passionate researcher exploring AI, linguistics, and computational models.',
    email: 'jarin.anika@example.com',
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    github: 'https://github.com/',
    instagram: 'https://instagram.com/',
    photoUrl: userLogo,
  };

  return (
    <div className="pt-24 md:pt-40 md:pr-20 md:pl-[320px] min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors">
      <div className="flex flex-col items-center px-4 sm:px-6 md:w-[320px] mx-auto">
        {/* Avatar */}
        <div className="relative group w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 mb-5">
          <Avatar className="w-full h-full border-2 border-green-400 shadow-md rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <AvatarImage src={user.photoUrl} />
          </Avatar>
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-green-600 opacity-5 group-hover:opacity-20 transition-opacity" />
        </div>

        {/* Profile Info */}
        <div className="text-center max-w-full">
          <h2 className="font-bold text-3xl sm:text-4xl mb-2 text-gray-800 dark:text-gray-100 truncate">
            {user.firstName}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-alegreya text-sm sm:text-base break-words">
            {user.bio}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2 font-alegreya text-sm sm:text-base truncate">
            {user.email}
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-5 justify-center flex-wrap">
            {[user.facebook, user.linkedin, user.github, user.instagram].map((link, idx) => {
              const icons = [FaFacebook, FaLinkedin, FaGithub, FaInstagram];
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
              <Button
                onClick={() => setOpen(true)}
                className="rounded-full border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white px-4 sm:px-6 py-2 hover:opacity-90 transition font-alegreya w-full sm:w-auto"
              >
                Edit Profile
              </Button>

              <DialogContent className="w-full sm:w-[400px] md:w-[450px] rounded-2xl font-grotesk max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-semibold">Update Profile</DialogTitle>
                  <DialogDescription className="text-center text-gray-500">profile form</DialogDescription>
                </DialogHeader>

                <form className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label>First Name</Label>
                      <Input value={user.firstName} readOnly className="text-gray-600 mt-2" />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input value={user.lastName} readOnly className="text-gray-600 mt-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label>Facebook</Label>
                      <Input value={user.facebook} readOnly className="text-gray-600 mt-2 truncate" />
                    </div>
                    <div>
                      <Label>Instagram</Label>
                      <Input value={user.instagram} readOnly className="text-gray-600 mt-2 truncate" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label>LinkedIn</Label>
                      <Input value={user.linkedin} readOnly className="text-gray-600 mt-2 truncate" />
                    </div>
                    <div>
                      <Label>GitHub</Label>
                      <Input value={user.github} readOnly className="text-gray-600 mt-2 truncate" />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea value={user.bio} readOnly className="text-gray-600 mt-2" />
                  </div>

                  <div>
                    <Label>Profile Picture</Label>
                    <Input type="file" disabled className="w-full mt-2" />
                  </div>

                  <DialogFooter>
                    <Button disabled className="w-full bg-gray-200 text-gray-600">
                      Update (Disabled)
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
