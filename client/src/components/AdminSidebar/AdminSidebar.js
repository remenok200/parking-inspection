import React, { useRef, useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './AdminSidebar.module.scss';

const AdminSidebar = ({ isOpen, toggleSidebar, setActivePage }) => {
  const sidebarRef = useRef(null);
  const [showHamburger, setShowHamburger] = useState(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isOpen) {
          toggleSidebar(); // Закрытие сайдбара при клике вне его области
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  useEffect(() => {
    if (isOpen) {
      setShowHamburger(false);
    } else {
      // Добавляем задержку перед показом кнопки гамбургера
      const timer = setTimeout(() => setShowHamburger(true), 300); // Задержка соответствует времени анимации
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={sidebarRef}
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
      {showHamburger && (
        <button className={styles['sidebar-open-btn']} onClick={toggleSidebar}>
          <MenuIcon />
        </button>
      )}
    </>
  );
};

export default AdminSidebar;
