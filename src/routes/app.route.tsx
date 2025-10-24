import App from '@/App';
import { Developers } from '@/pages/developers/developers.page';
import { JoinPage } from '@/pages/join/join.page';
import { LeadershipPage } from '@/pages/leaderShip/leadership.page';
import { NotFound } from '@/pages/notFound/notFound.page';
import { MemberListPage } from '@/pages/private/memberList/memberList.page';
import { SignInPage } from '@/pages/signin/SignInPage';
import MERNResourcePage from '@/pages/software-dev/resources/resources.page';
import { UnderMaintenance } from '@/pages/UnderMaintenance/UnderMaintenance.page';
import { RoutePaths } from '@/types/route.type';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ProtectedRoutes } from './private.route';
import { AdvisorPage } from '@/pages/advisor/AdvisorPage';
import { ExecutivePage } from '@/pages/executive/ExecutivePage';
import { AboutPage } from '@/pages/about/AboutPage';
import { BlogPage } from '@/pages/blog/BlogPage';
import ContactPage from '@/pages/contact/ContactPage';
import { EventPage } from '@/pages/event/EventPage';
import TimelinePage from '@/pages/timeline/TimelinePage';
import { UserDashboard } from '@/pages/userDashboard/UserDashboard';
import Profile from '@/pages/userDashboard/Profile';
import UserBlog from '@/pages/userDashboard/UserBlog';
import WriteBlog from '@/pages/userDashboard/WriteBlog';
import UpdateBlog from '@/pages/userDashboard/UpdateBlog';
import RegisteredEvents from '@/pages/userDashboard/RegisteredEvents';
import Dues from '@/pages/userDashboard/Dues';
import Settings from '@/pages/userDashboard/Settings';

const appRouter = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.ABOUT,
    element: <AboutPage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.ADVISOR,
    element: <AdvisorPage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.EXECUTIVE,
    element: <ExecutivePage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.BLOG,
    element: <BlogPage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.EVENTS,
    element: <EventPage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.TIMELINE,
    element: <TimelinePage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.PEOPLE,
    element: <LeadershipPage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.CONTACT,
    element: <ContactPage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.JOIN,
    element: <JoinPage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.USER_DASHBOARD,
    element: <UserDashboard />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'registered-events',
        element: <RegisteredEvents></RegisteredEvents>,
      },
      {
        path: 'your-blog',
        element: <UserBlog></UserBlog>,
      },
      {
        path: 'write-blog',
        element: <WriteBlog></WriteBlog>,
      },
      {
        path: 'update-blog',
        element: <UpdateBlog></UpdateBlog>,
      },
      {
        path: 'dues',
        element: <Dues></Dues>,
      },
      {
        path: 'settings',
        element: <Settings></Settings>,
      },
    ],
  },

  {
    path: RoutePaths.SW_DEV_WING,
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <UnderMaintenance />,
        errorElement: <NotFound />,
      },
      {
        path: 'resources',
        element: <Outlet />,
        errorElement: <NotFound />,
        children: [
          {
            path: '',
            element: <UnderMaintenance />,
            errorElement: <NotFound />,
          },
          {
            path: 'software-dev-mern-seminar-resource',
            element: <MERNResourcePage />,
            errorElement: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: RoutePaths.DEV,
    element: <Developers />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.SIGN_IN,
    element: <SignInPage />,
    errorElement: <NotFound />,
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <NotFound />,
    children: [
      {
        path: RoutePaths.MEMBER_LIST,
        element: <MemberListPage />,
      },
    ],
  },
]);

export default appRouter;
