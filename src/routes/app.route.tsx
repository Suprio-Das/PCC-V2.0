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

const appRouter = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.ABOUT,
    element: <AboutPage></AboutPage>,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.ADVISOR,
    element: <AdvisorPage></AdvisorPage>,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.EXECUTIVE,
    element: <ExecutivePage></ExecutivePage>,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.BLOG,
    element: <BlogPage></BlogPage>,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.EVENTS,
    element: <EventPage></EventPage>,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.TIMELINE,
    element: <TimelinePage></TimelinePage>,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.PEOPLE,
    element: <LeadershipPage />,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.CONTACT,
    element: <ContactPage></ContactPage>,
    errorElement: <NotFound />,
  },
  {
    path: RoutePaths.JOIN,
    element: <JoinPage />,
    errorElement: <NotFound />,
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
