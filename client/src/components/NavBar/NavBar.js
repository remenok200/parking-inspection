import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import useHasRole from '../../hooks/useHasRole';
import { logout } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

const NavBar = () => {
  const isAdmin = useHasRole('admin');
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <nav>
      <ul className={styles['nav-list']}>
        <li>
          <NavLink
            to="/officers"
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
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            My Profile
          </NavLink>
        </li>
        {isAdmin && (
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              A-Panel
            </NavLink>
          </li>
        )}
        <li>
          <button onClick={() => dispatch(logout(refreshToken))}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
