import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import MyProfile from '../pages/MyProfile/MyProfile';

const userRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/profile', element: <MyProfile /> },
  { path: '*', element: <NotFoundPage /> },
];

export default userRoutes;
