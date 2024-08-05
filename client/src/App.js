import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ParkOfficersPage from './pages/ParkOfficersPage/ParkOfficersPage';
import ProtocolsPage from './pages/ProtocolsPage/ProtocolsPage';
import styles from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul className={styles['nav-list']}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Officers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/protocols"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Protocols
            </NavLink>
          </li>
        </ul>
      </nav>

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
