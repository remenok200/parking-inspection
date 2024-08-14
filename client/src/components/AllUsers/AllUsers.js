import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { banUser, getAllUsers } from '../../redux/slices/adminSlice';
import styles from './AllUsers.module.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers } = useSelector((state) => state.admins);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleViewSessions = (userId) => {
    navigate(`/admin/users/sessions/${userId}`);
  };

  const handleBan = async (userId) => {
    const reason = prompt('Enter the reason for banning this user:');
    if (reason) {
      await dispatch(banUser({ userId, reason }));
      await dispatch(getAllUsers());
    }
  };

  return (
    <div className={styles['all-users']}>
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className={styles['content']}>
        <h2>All Users</h2>
        {allUsers && allUsers.length > 0 ? (
          <table className={styles['user-table']}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nickname</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className={styles['ban-button']}
                      onClick={() => handleBan(user._id)}
                    >
                      Ban
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles['view-button']}
                      onClick={() => handleViewSessions(user._id)}
                    >
                      Sessions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
