import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav>
      <ul className={styles['nav-list']}>
        <li>
          <NavLink
            to="/"
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
      </ul>
    </nav>
  );
};

export default NavBar;
