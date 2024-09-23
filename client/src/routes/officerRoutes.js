import ParkOfficersPage from '../pages/ParkOfficersPage/ParkOfficersPage';
import AddParkOfficer from '../components/AddParkOfficer/AddParkOfficer';
import UpdateParkOfficer from '../components/UpdateParkOfficer/UpdateParkOfficer';
import ParkOfficerDetailsPage from '../pages/ParkOfficerDetailsPage/ParkOfficerDetailsPage';

const officerRoutes = [
  { path: '/officers', element: <ParkOfficersPage /> },
  { path: '/officers/details/:officerID', element: <ParkOfficerDetailsPage /> },
  { path: '/officers/add', element: <AddParkOfficer /> },
  { path: '/officers/edit/:parkOfficerID', element: <UpdateParkOfficer /> },
];

export default officerRoutes;
