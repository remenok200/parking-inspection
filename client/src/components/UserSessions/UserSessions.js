import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserSessions } from '../../redux/slices/adminSlice';
//import styles from './UserSessions.module.scss';

const UserSessions = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userSessions, error } = useSelector((state) => state.admins);

  useEffect(() => {
    if (userId) {
      dispatch(getUserSessions(userId));
    }
  }, [dispatch, userId]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>User Sessions</h2>
      {userSessions && userSessions.length > 0 ? (
        <table>
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
                <td>{new Date(session.createdAt).toLocaleString()}</td>
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
  );
};

export default UserSessions;
