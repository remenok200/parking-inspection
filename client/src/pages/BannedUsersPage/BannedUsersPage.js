import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unbanUser, getAllBannedUsers } from '../../redux/slices/adminSlice';
import styles from './BannedUsersPage.module.scss';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useNavigate } from 'react-router-dom';

const BannedUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bannedUsers } = useSelector((state) => state.admins);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBannedUsers());
  }, [dispatch]);

  const handleUnban = async (userId) => {
    await dispatch(unbanUser(userId));
    await dispatch(getAllBannedUsers());
  };

  const handleViewSessions = (userId) => {
    navigate(`/admin/users/sessions/${userId}`);
  };

  const handleViewLogs = (userId) => {
    navigate(`/admin/users/logs/${userId}`);
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
                <th>Role</th>
                <th>Ban Reason</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bannedUsers.map((ban) => (
                <tr key={ban.user._id}>
                  <td>{ban.user._id}</td>
                  <td>{ban.user.nickname}</td>
                  <td>{ban.user.email}</td>
                  <td>{ban.user.role}</td>
                  <td>{ban.banInfo.reason}</td>
                  <td>
                    <button
                      className={styles['unban-button']}
                      onClick={() => handleUnban(ban.user._id)}
                    >
                      Unban
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles['view-button']}
                      onClick={() => handleViewSessions(ban.user._id)}
                    >
                      Sessions
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles['view-button']}
                      onClick={() => handleViewLogs(ban.user._id)}
                    >
                      Logs
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
