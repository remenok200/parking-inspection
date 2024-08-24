import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { banUser, getAllUsers } from '../../redux/slices/adminSlice';
import styles from './AllUsersPage.module.scss';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers } = useSelector((state) => state.admins);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleViewSessions = (userId) => {
    navigate(`/admin/users/sessions/${userId}`);
  };

  const handleViewLogs = (userId) => {
    navigate(`/admin/users/logs/${userId}`);
  };

  const handleBan = async (userId) => {
    const reason = prompt('Enter the reason for banning this user:');
    if (reason) {
      await dispatch(banUser({ userId, reason }));
      await dispatch(getAllUsers());
    }
  };

  const filteredUsers = (allUsers || []).filter(user => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.nickname.toLowerCase().includes(searchValue.toLowerCase());

    const matchesRole =
      roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className={styles['all-users']}>
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className={styles['content']}>
        <h2>All Users</h2>
        <div className={styles['filter-container']}>
          <input
            type="text"
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
            placeholder="Search by email or nickname"
            className={styles['search-input']}
          />
          <select
            value={roleFilter}
            onChange={({ target: { value } }) => setRoleFilter(value)}
            className={styles['role-select']}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        {filteredUsers && filteredUsers.length > 0 ? (
          <table className={styles['user-table']}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nickname</th>
                <th>Email</th>
                <th>Role</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
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
                  <td>
                    <button
                      className={styles['view-button']}
                      onClick={() => handleViewLogs(user._id)}
                    >
                      Logs
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
