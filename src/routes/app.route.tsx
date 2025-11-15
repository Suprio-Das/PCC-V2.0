import App from '@/App';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SetUser, Logout } from '@/Redux/AuthSlice';
import api from '@/Services/api';
import { AppDispatch } from '@/Redux/Store';
import { Developers } from '@/pages/developers/developers.page';
import { JoinPage } from '@/pages/join/JoinPage';
import { LeadershipPage } from '@/pages/leaderShip/leadership.page';
import { NotFound } from '@/pages/notFound/notFound.page';
import { MemberListPage } from '@/pages/private/memberList/memberList.page';
import { SignInPage } from '@/pages/signin/SignInPage';
import MERNResourcePage from '@/pages/software-dev/resources/resources.page';
import { UnderMaintenance } from '@/pages/UnderMaintenance/UnderMaintenance.page';
import { RoutePaths } from '@/types/route.type';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './private.route';
import { AdvisorPage } from '@/pages/advisor/AdvisorPage';
import { ExecutivePage } from '@/pages/executive/ExecutivePage';
import { AboutPage } from '@/pages/about/AboutPage';
import { BlogPage } from '@/pages/blog/BlogPage';
import ContactPage from '@/pages/contact/ContactPage';
import { EventPage } from '@/pages/event/EventPage';
import TimelinePage from '@/pages/timeline/TimelinePage';
import Profile from '@/pages/userDashboard/Profile';
import UserBlog from '@/pages/userDashboard/UserBlog';
import WriteBlog from '@/pages/userDashboard/WriteBlog';
import UpdateBlog from '@/pages/userDashboard/UpdateBlog';
import RegisteredEvents from '@/pages/userDashboard/RegisteredEvents';
import Settings from '@/pages/userDashboard/Settings';
import AdminSettings from '@/pages/adminDashboard/AdminSettings';
import Dashboard from '@/pages/adminDashboard/Dashboard';
import Events from '@/pages/adminDashboard/Events';
import CreateEvents from '@/pages/adminDashboard/CreateEvents';
import ApproveBlogs from '@/pages/adminDashboard/ApproveBlogs';
import Members from '@/pages/adminDashboard/Members';
import ApproveMembers from '@/pages/adminDashboard/ApproveMembers';
import UpdateEvent from '@/pages/adminDashboard/UpdateEvent';
import MakePayment from '@/pages/userDashboard/MakePayment';
import PaymentHistory from '@/pages/userDashboard/PaymentHistory';
import AdminLayouts from '@/Layouts/AdminLayouts';
import StudentLayouts from '@/Layouts/StudentLayouts';
import { UserDashboard } from '@/pages/userDashboard/UserDashboard';
import { AdminDashboard } from '@/pages/adminDashboard/AdminDashboard';
import { FullLeaderboard } from '@/pages/blog/FullLeaderboard';
import { ProfilePage } from '@/pages/blog/ProfilePage';
import RegisteredStudents from '@/pages/adminDashboard/RegisteredStudents';
import Payments from '@/pages/adminDashboard/Payments';

function AppRouter() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await api.get('/check', { withCredentials: true });
        if (res.data.success && res.data.user) {
          dispatch(SetUser(res.data.user));
        } else {
          dispatch(Logout());
        }
      } catch {
        dispatch(Logout());
      }
    };

    verifyUser();
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path={RoutePaths.ROOT} element={<App />} />
          <Route path={RoutePaths.ABOUT} element={<AboutPage />} />
          <Route path={RoutePaths.ADVISOR} element={<AdvisorPage />} />
          <Route path={RoutePaths.EXECUTIVE} element={<ExecutivePage />} />
          <Route path={RoutePaths.BLOG} element={<BlogPage />} />
          <Route path={RoutePaths.FULLLEADERBOARD} element={<FullLeaderboard />} />
          <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
          <Route path={RoutePaths.EVENTS} element={<EventPage />} />
          <Route path={RoutePaths.TIMELINE} element={<TimelinePage />} />
          <Route path={RoutePaths.PEOPLE} element={<LeadershipPage />} />
          <Route path={RoutePaths.CONTACT} element={<ContactPage />} />
          <Route path={RoutePaths.JOIN} element={<JoinPage />} />
          <Route path={RoutePaths.SIGN_IN} element={<SignInPage />} />
          <Route path={RoutePaths.DEV} element={<Developers />} />

          {/* Admin Dashboard */}
          <Route path={RoutePaths.ADMIN_DASHBOARD} element={<AdminLayouts />}>
            <Route path={RoutePaths.ADMIN_DASHBOARD} element={<AdminDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="events" element={<Events />} />
              {/* <Route path="registered-students" element={<RegisteredStudents />} /> */}
              <Route path="events/:id/registered-students" element={<RegisteredStudents />} />
              <Route path="create-events" element={<CreateEvents />} />
              <Route path="update-events" element={<UpdateEvent />} />
              <Route path="approve-blogs" element={<ApproveBlogs />} />
              <Route path="members" element={<Members />} />
              <Route path="approve-members" element={<ApproveMembers />} />
              <Route path="payments" element={<Payments />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* User Dashboard */}
          <Route path={RoutePaths.USER_DASHBOARD} element={<StudentLayouts />}>
            <Route path={RoutePaths.USER_DASHBOARD} element={<UserDashboard />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="registered-events" element={<RegisteredEvents />} />
              <Route path="your-blog" element={<UserBlog />} />
              <Route path="write-blog" element={<WriteBlog />} />
              <Route path="update-blog" element={<UpdateBlog />} />
              <Route path="dues" element={<MakePayment />} />
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Software Dev Wing */}
          <Route path={RoutePaths.SW_DEV_WING}>
            <Route index element={<UnderMaintenance />} />
            <Route path="resources">
              <Route index element={<UnderMaintenance />} />
              <Route path="software-dev-mern-seminar-resource" element={<MERNResourcePage />} />
            </Route>
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path={RoutePaths.MEMBER_LIST} element={<MemberListPage />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
