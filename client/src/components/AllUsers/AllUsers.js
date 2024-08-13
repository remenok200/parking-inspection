import React from 'react';
import { useDispatch } from 'react-redux';
import { banUser, getAllUsers } from '../../redux/slices/adminSlice';
import styles from './AllUsers.module.scss';

const AllUsers = ({ users }) => {
  const dispatch = useDispatch();

  const handleBan = async (userId) => {
    const reason = prompt('Enter the reason for banning this user:');
    if (reason) {
      await dispatch(banUser({ userId, reason }));
      await dispatch(getAllUsers());
    }
  };

  return (
    <div className={styles['all-users']}>
      <h2>All Users</h2>
      {users && users.length > 0 ? (
        <table className={styles['user-table']}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nickname</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;
