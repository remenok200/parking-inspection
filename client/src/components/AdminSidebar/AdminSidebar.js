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
      const timer = setTimeout(() => setShowHamburger(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={cx(styles.sidebar, {
          [styles.open]: isOpen,
          [styles.closed]: !isOpen,
        })}
      >
        <button className={styles['toggle-btn']} onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        {isOpen && (
          <ul className={styles.menu}>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  cx(styles.navLink, {
                    [styles.active]:
                      isActive && window.location.pathname === '/admin',
                  })
                }
                onClick={toggleSidebar}
              >
                Back to A-Panel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  cx(styles.navLink, {
                    [styles.active]:
                      isActive && window.location.pathname === '/admin/users',
                  })
                }
                onClick={toggleSidebar}
              >
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users/banned"
                className={({ isActive }) =>
                  cx(styles.navLink, {
                    [styles.active]:
                      isActive &&
                      window.location.pathname === '/admin/users/banned',
                  })
                }
                onClick={toggleSidebar}
              >
                Banned Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users/logs"
                className={({ isActive }) =>
                  cx(styles.navLink, {
                    [styles.active]:
                      isActive &&
                      window.location.pathname === '/admin/users/logs',
                  })
                }
                onClick={toggleSidebar}
              >
                Logs
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      {showHamburger && (
        <button
          className={cx(styles['sidebar-open-btn'], {
            [styles.visible]: showHamburger,
          })}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </button>
      )}
    </>
  );
};

export default AdminSidebar;
