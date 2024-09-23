import AdminPanelPage from '../pages/AdminPanelPage/AdminPanelPage';
import AllUsersPage from '../pages/AllUsersPage/AllUsersPage';
import BannedUsersPage from '../pages/BannedUsersPage/BannedUsersPage';
import UserSessionsPage from '../pages/UserSessionsPage/UserSessionsPage';
import UserLogsPage from '../pages/UserLogsPage/UserLogsPage';

const adminRoutes = [
  { path: '/admin', element: <AdminPanelPage /> },
  { path: '/admin/users', element: <AllUsersPage /> },
  { path: '/admin/users/banned', element: <BannedUsersPage /> },
  { path: '/admin/users/sessions/:userId', element: <UserSessionsPage /> },
  { path: '/admin/users/logs/', element: <UserLogsPage /> },
  { path: '/admin/users/logs/:userId', element: <UserLogsPage /> },
];

export default adminRoutes;
