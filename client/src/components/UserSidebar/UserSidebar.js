import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './UserSidebar.module.scss';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import useHasRole from '../../hooks/useHasRole';

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const [showHamburger, setShowHamburger] = useState(!isOpen);
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  const isAdmin = useHasRole('admin');

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
    <div className={styles.wrapper}>
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
                to="/officers"
                className={({ isActive }) =>
                  cx(styles.navLink, {
                    [styles.active]: isActive,
                  })
                }
                onClick={toggleSidebar}
              >
                Officers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/protocols"
                className={({ isActive }) =>
                  cx(styles.navLink, {
                    [styles.active]: isActive,
                  })
                }
                onClick={toggleSidebar}
              >
                Protocols
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  cx(styles.navLink, {
                    [styles.active]: isActive,
                  })
                }
                onClick={toggleSidebar}
              >
                My Profile
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    cx(styles.navLink, {
                      [styles.active]: isActive,
                    })
                  }
                  onClick={toggleSidebar}
                >
                  A-Panel
                </NavLink>
              </li>
            )}
            <li>
              <button
                className={`${styles.navLink} ${styles.logoutBtn}`}
                onClick={() => {
                  dispatch(logout(refreshToken));
                  toggleSidebar();
                }}
              >
                Logout
              </button>
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
    </div>
  );
};

export default UserSidebar;
