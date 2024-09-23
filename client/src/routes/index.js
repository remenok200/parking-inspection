import adminRoutes from './adminRoutes';
import officerRoutes from './officerRoutes';
import protocolRoutes from './protocolRoutes';
import userRoutes from './userRoutes';

const routes = [
  ...adminRoutes,
  ...officerRoutes,
  ...protocolRoutes,
  ...userRoutes,
];

export default routes;
