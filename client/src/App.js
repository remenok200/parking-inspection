import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParkOfficersPage from './pages/ParkOfficersPage/ParkOfficersPage';
import ProtocolsPage from './pages/ProtocolsPage/ProtocolsPage';
import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import { useSelector } from 'react-redux';
import withSpinner from './HOC/withSpinner';

function App() {
  return (
    <HomePage />
    // <BrowserRouter>
    //   <NavBar />

    //   <Routes>
    //     <Route path="/" element={<ParkOfficersPage />} />
    //     <Route path="/protocols" element={<ProtocolsPage />} />
    //     <Route
    //       path="/protocols/:parkOfficerID/:parkOfficerFullName"
    //       element={<ProtocolsPage />}
    //     />
    //   </Routes>
    // </BrowserRouter>
  );
}

const AppWithSpinner = withSpinner(App);

const AppWrapper = () => {
  const loadingStates = [
    useSelector((state) => state.users.isLoading),
    useSelector((state) => state.protocols.isLoading),
    useSelector((state) => state.parkOfficers.isLoading),
  ];

  const isLoading = loadingStates.some((state) => state);

  return <AppWithSpinner isLoading={isLoading} />;
};

export default AppWrapper;
