import ProtocolsPage from '../pages/ProtocolsPage/ProtocolsPage';
import CreateProtocol from '../components/CreateProtocol/CreateProtocol';
import AddImage from '../components/AddImage/AddImage';
import UpdateProtocol from '../components/UpdateProtocol/UpdateProtocol';
import ProtocolDetailsPage from '../pages/ProtocolDetailsPage/ProtocolDetailsPage';

const protocolRoutes = [
  { path: '/protocols', element: <ProtocolsPage /> },
  { path: '/protocols/:parkOfficerID/', element: <ProtocolsPage /> },
  { path: '/protocols/details/:protocolID', element: <ProtocolDetailsPage /> },
  { path: '/protocols/create/:parkOfficerID', element: <CreateProtocol /> },
  { path: '/protocols/:protocolID/add/image', element: <AddImage /> },
  { path: '/protocols/edit/:protocolID', element: <UpdateProtocol /> },
];

export default protocolRoutes;
