import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserSessions, getAllUsers } from '../../redux/slices/adminSlice';
import styles from './UserSessions.module.scss';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';
import { getIPInfo } from '../../utils/getIPInfo';
import { getGeolocationInfo } from '../../utils/getGeolocationInfo';

const UserSessions = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSessions, allUsers } = useSelector((state) => state.admins);

  const [sessionDetails, setSessionDetails] = useState([]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserSessions(userId));
      dispatch(getAllUsers());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userSessions && userSessions.length > 0) {
      const fetchSessionDetails = async () => {
        const details = await Promise.all(
          userSessions.map(async (session) => {
            const geolocationInfo = session.geolocation
              ? await getGeolocationInfo(session.geolocation)
              : null;

            const ipInfo = session.ipAddress
              ? await getIPInfo(session.ipAddress)
              : null;

            return { ...session, geoInfo: geolocationInfo, ipInfo: ipInfo };
          })
        );
        setSessionDetails(details);
      };
      fetchSessionDetails();
    }
  }, [userSessions]);

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
                <th>Provider Info</th>
                <th>Geolocation</th>
                <th>Geolocation Info</th>
              </tr>
            </thead>
            <tbody>
              {userSessions.map((session) => {
                const sessionDetail = sessionDetails.find(
                  (detail) => detail.token === session.token
                );

                return (
                  <tr key={session.token}>
                    <td>{`${formatDateTime(session.createdAt)} | ${timeAgo(
                      session.createdAt
                    )}`}</td>
                    <td>{session.ipAddress || 'Unknown'}</td>
                    <td>
                      {sessionDetail && sessionDetail.ipInfo ? (
                        <>
                          <img
                            src={`https://flagcdn.com/16x12/${
                              sessionDetail.ipInfo.countryCode || 'unknown'
                            }.png`}
                            alt={`${sessionDetail.ipInfo.country || 'Unknown'}`}
                          />
                          {` ${sessionDetail.ipInfo.country || 'Unknown'}, ${
                            sessionDetail.ipInfo.city || 'Unknown'
                          }, ${sessionDetail.ipInfo.provider || 'Unknown'}`}
                        </>
                      ) : (
                        'Unknown'
                      )}
                    </td>
                    <td>{session.geolocation || 'Unknown'}</td>
                    <td>
                      {sessionDetail && sessionDetail.geoInfo ? (
                        <a
                          href={`https://www.google.com/maps?q=${sessionDetail.geoInfo.latitude},${sessionDetail.geoInfo.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles['geo-link']}
                        >
                          <img
                            src={`https://flagcdn.com/16x12/${
                              sessionDetail.geoInfo.countryCode || 'unknown'
                            }.png`}
                            alt={`${
                              sessionDetail.geoInfo.country || 'Unknown'
                            }`}
                          />
                          {`${sessionDetail.geoInfo.country || 'Unknown'}, ${
                            sessionDetail.geoInfo.region || 'Unknown'
                          }, ${sessionDetail.geoInfo.city || 'Unknown'}, ${
                            sessionDetail.geoInfo.street || 'Unknown'
                          }`}
                        </a>
                      ) : (
                        'Unknown'
                      )}
                    </td>
                  </tr>
                );
              })}
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
