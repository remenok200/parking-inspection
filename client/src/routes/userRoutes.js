import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import MyProfile from '../pages/MyProfile/MyProfile';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';

const userRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/profile', element: <MyProfile /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password/:token', element: <ResetPassword /> },
  { path: '*', element: <NotFoundPage /> },
];

export default userRoutes;
