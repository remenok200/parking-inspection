import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unbanUser, getAllBannedUsers } from '../../redux/slices/adminSlice';
import styles from './BannedUsers.module.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

const BannedUsers = () => {
  const dispatch = useDispatch();
  const { bannedUsers } = useSelector((state) => state.admins);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBannedUsers());
  }, [dispatch]);

  const handleUnban = async (userId) => {
    await dispatch(unbanUser(userId));
    await dispatch(getAllBannedUsers());
  };

  return (
    <div className={styles['banned-users']}>
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className={styles['content']}>
        <h2>Banned Users</h2>
        {bannedUsers && bannedUsers.length > 0 ? (
          <table className={styles['user-table']}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nickname</th>
                <th>Email</th>
                <th>Ban Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bannedUsers.map((ban) => (
                <tr key={ban.user._id}>
                  <td>{ban.user._id}</td>
                  <td>{ban.user.nickname}</td>
                  <td>{ban.user.email}</td>
                  <td>{ban.banInfo.reason}</td>
                  <td>
                    <button
                      className={styles['unban-button']}
                      onClick={() => handleUnban(ban.user._id)}
                    >
                      Unban
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No banned users found.</p>
        )}
      </div>
    </div>
  );
};

export default BannedUsers;
