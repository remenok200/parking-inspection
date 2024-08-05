import ParkOfficersPage from './pages/ParkOfficersPage/ParkOfficersPage';
import ProtocolsPage from './pages/ProtocolsPage/ProtocolsPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styles from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul className={styles['nav-list']}>
          <li>
            <Link className={styles.link} to="/">
              Officers
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/protocols">
              Protocols
            </Link>
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
