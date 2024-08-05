import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParkOfficersPage from './pages/ParkOfficersPage/ParkOfficersPage';
import ProtocolsPage from './pages/ProtocolsPage/ProtocolsPage';
import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<ParkOfficersPage />} />
        <Route path="/protocols" element={<ProtocolsPage />} />
        <Route
          path="/protocols/:parkOfficerID/:parkOfficerFullName"
          element={<ProtocolsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
