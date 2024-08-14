import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserSessions, getAllUsers } from '../../redux/slices/adminSlice';
import styles from './UserSessions.module.scss';
import { useNavigate } from 'react-router-dom';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';

const UserSessions = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSessions, allUsers } = useSelector((state) => state.admins);

  useEffect(() => {
    if (userId) {
      dispatch(getUserSessions(userId));
      dispatch(getAllUsers());
    }
  }, [dispatch, userId]);

  const user = allUsers?.find((user) => user._id === userId);

  const handleBack = () => {
    navigate('/admin/users');
  };

  return (
    <div className={styles['user-sessions']}>
      <div className={styles['content']}>
        <button className={styles['back-button']} onClick={handleBack}>
          Back to Users
        </button>
        <h2>User Sessions</h2>
        {user && <h3>{user.nickname}'s Sessions</h3>}
        {userSessions && userSessions.length > 0 ? (
          <table className={styles['sessions-table']}>
            <thead>
              <tr>
                <th>Session Created At</th>
                <th>IP Address</th>
                <th>Geolocation</th>
              </tr>
            </thead>
            <tbody>
              {userSessions.map((session) => (
                <tr key={session.token}>
                  <td>{`${formatDateTime(session.createdAt)} | ${timeAgo(session.createdAt)}`}</td>
                  <td>{session.ipAddress}</td>
                  <td>{session.geolocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSessions;
