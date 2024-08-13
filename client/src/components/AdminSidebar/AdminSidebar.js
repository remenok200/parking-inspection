import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './AdminSidebar.module.scss';
import cx from 'classnames';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
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
              <NavLink
                to="/admin/users"
                className={({ isActive }) => cx({ [styles.active]: isActive })}
                onClick={() => isOpen && toggleSidebar()} // Закрыть сайдбар при клике на ссылку
              >
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users/banned"
                className={({ isActive }) => cx({ [styles.active]: isActive })}
                onClick={() => isOpen && toggleSidebar()} // Закрыть сайдбар при клике на ссылку
              >
                Banned Users
              </NavLink>
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
