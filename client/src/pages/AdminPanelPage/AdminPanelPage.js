import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminPanelPage.module.scss';
import NavBar from '../../components/NavBar/NavBar';

const AdminPanelPage = () => {
  return (
    <>
      <NavBar />
      
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
