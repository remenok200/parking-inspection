import React from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import ParkOfficersPage from './pages/ParkOfficersPage/ParkOfficersPage';
import ProtocolsPage from './pages/AllProtocolsPage/ProtocolsPage';
import styles from './App.module.scss';
import HomePage from './pages/HomePage/HomePage';
import { useSelector } from 'react-redux';
import withSpinner from './HOC/withSpinner';
import history from './BrowserHistory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useErrorToast from './hooks/userErrorToast';
import AddParkOfficer from './components/AddParkOfficer/AddParkOfficer';
import CreateProtocol from './components/CreateProtocol/CreateProtocol';
import UpdateParkOfficer from './components/UpdateParkOfficer/UpdateParkOfficer';
import UpdateProtocol from './components/UpdateProtocol/UpdateProtocol';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage';
import AddImage from './components/AddImage/AddImage';
import AllUsersPage from './pages/AllUsersPage/AllUsersPage';
import BannedUsersPage from './pages/BannedUsersPage/BannedUsersPage';
import UserSessionsPage from './pages/UserSessionsPage/UserSessionsPage';
import UserLogsPage from './pages/UserLogsPage/UserLogsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import useAuthCheck from './hooks/useAuthCheck';
import Protocol from './pages/ProtocolPage/Protocol';
import ParkOfficerDetailsPage from './pages/ParkOfficerDetailsPage/ParkOfficerDetailsPage';

function App() {
  useErrorToast();
  useAuthCheck();

  return (
    <HistoryRouter history={history}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        newestOnTop
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/officers" element={<ParkOfficersPage />} />
        <Route
          path="/officers/:officerID"
          element={<ParkOfficerDetailsPage />}
        />
        <Route path="/officers/add" element={<AddParkOfficer />} />
        <Route
          path="/officers/edit/:parkOfficerID"
          element={<UpdateParkOfficer />}
        />

        <Route path="/protocols/details/:protocolID" element={<Protocol />} />
        <Route path="/protocols" element={<ProtocolsPage />} />
        <Route
          path="/protocols/create/:parkOfficerID"
          element={<CreateProtocol />}
        />
        <Route path="/protocols/:protocolID/add/image" element={<AddImage />} />
        <Route
          path="/protocols/edit/:protocolID"
          element={<UpdateProtocol />}
        />
        <Route path="/protocols/:parkOfficerID/" element={<ProtocolsPage />} />

        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/admin/users" element={<AllUsersPage />} />
        <Route path="/admin/users/banned" element={<BannedUsersPage />} />
        <Route
          path="/admin/users/sessions/:userId"
          element={<UserSessionsPage />}
        />
        <Route path="/admin/users/logs/" element={<UserLogsPage />} />
        <Route path="/admin/users/logs/:userId" element={<UserLogsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

const AppWithSpinner = withSpinner(App);

const AppWrapper = () => {
  const isLoading = useSelector((state) =>
    Object.values(state).some((slice) => slice.isLoading)
  );

  return <AppWithSpinner isLoading={isLoading} />;
};

export default AppWrapper;
