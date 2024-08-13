import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './AdminSidebar.module.scss';

const AdminSidebar = ({ isOpen, toggleSidebar, setActivePage }) => {
  return (
    <>
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <button className={styles['toggle-btn']} onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        {isOpen && (
          <ul className={styles.menu}>
            <li>
              <button onClick={() => setActivePage('allUsers')}>
                All Users
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('bannedUsers')}>
                Banned Users
              </button>
            </li>
          </ul>
        )}
      </div>
      {!isOpen && (
        <button className={styles['sidebar-open-btn']} onClick={toggleSidebar}>
          <MenuIcon />
        </button>
      )}
    </>
  );
};

export default AdminSidebar;
