import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import useHasRole from '../../hooks/useHasRole';

const NavBar = () => {
  const isAdmin = useHasRole('admin');

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
      </ul>
    </nav>
  );
};

export default NavBar;
