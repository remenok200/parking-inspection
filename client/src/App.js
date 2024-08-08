import React from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import ParkOfficersPage from './pages/ParkOfficersPage/ParkOfficersPage';
import ProtocolsPage from './pages/ProtocolsPage/ProtocolsPage';
import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import { useSelector } from 'react-redux';
import withSpinner from './HOC/withSpinner';
import history from './BrowserHistory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useErrorToast from './hooks/userErrorToast';

function App() {
  useErrorToast();

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

      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/officers" element={<ParkOfficersPage />} />
        <Route path="/protocols" element={<ProtocolsPage />} />
        <Route
          path="/protocols/:parkOfficerID/"
          element={<ProtocolsPage />}
        />
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
