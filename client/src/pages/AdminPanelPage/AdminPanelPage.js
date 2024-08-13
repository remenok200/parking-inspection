import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getAllBannedUsers } from '../../redux/slices/adminSlice';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import styles from './AdminPanelPage.module.scss';
import cx from 'classnames';
import AllUsers from '../../components/AllUsers/AllUsers';
import BannedUsers from '../../components/BannedUsers/BannedUsers';

const AdminPanelPage = () => {
  const dispatch = useDispatch();
  const { allUsers, bannedUsers } = useSelector((state) => state.admins);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('allUsers');

  useEffect(() => {
    if (activePage === 'allUsers') {
      dispatch(getAllUsers());
    } else {
      dispatch(getAllBannedUsers());
    }
  }, [activePage, dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.adminPanel}>
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActivePage={setActivePage}
      />
      <div
        className={cx(styles.content, {
          [styles.sidebarOpen]: isSidebarOpen,
          [styles.sidebarClosed]: !isSidebarOpen,
        })}
      >
        {activePage === 'allUsers' ? (
          <AllUsers users={allUsers} />
        ) : (
          <BannedUsers users={bannedUsers} />
        )}
      </div>
    </div>
  );
};

export default AdminPanelPage;
