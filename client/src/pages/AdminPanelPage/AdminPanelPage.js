import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminPanelPage.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import useHasRole from '../../hooks/useHasRole';
import UserSidebar from '../../components/UserSidebar/UserSidebar';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../constants';
const { MOBILE_WIDTH } = CONSTANTS;

const AdminPanelPage = () => {
  const isAdmin = useHasRole('admin');
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAdmin) {
    navigate('/');
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_WIDTH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <UserSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      ) : (
        <NavBar />
      )}

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Admin Panel</h1>
        </div>
        <div className={styles.navigation}>
          <Link to="/admin/users" className={styles['nav-link']}>
            <div className={styles['nav-item']}>
              <h2>All Users</h2>
              <p>Manage and view all users in the system.</p>
            </div>
          </Link>
          <Link to="/admin/users/banned" className={styles['nav-link']}>
            <div className={styles['nav-item']}>
              <h2>Banned Users</h2>
              <p>View and manage banned users.</p>
            </div>
          </Link>
          <Link to="/admin/users/logs" className={styles['nav-link']}>
            <div className={styles['nav-item']}>
              <h2>Logs</h2>
              <p>View all actions.</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminPanelPage;
