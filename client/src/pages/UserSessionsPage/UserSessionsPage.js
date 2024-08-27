import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getUserSessions,
  getAllUsers,
  endSession,
} from '../../redux/slices/adminSlice';
import styles from './UserSessionsPage.module.scss';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';
import { getIPInfo } from '../../utils/getIPInfo';
import { getGeolocationInfo } from '../../utils/getGeolocationInfo';
import CONSTANTS from '../../constants';
const { SESSION_EXPIRES_TIME } = CONSTANTS;

const UserSessions = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSessions, allUsers } = useSelector((state) => state.admins);

  const [sessionDetails, setSessionDetails] = useState([]);
  const [visibleSessions, setVisibleSessions] = useState(10);
  const [loadingSessions, setLoadingSessions] = useState([]);

  const totalSessions = userSessions ? userSessions.length : 0;
  const hasMoreSessions = visibleSessions < totalSessions;

  const handleLoadMore = async () => {
    const nextBatch = Math.min(visibleSessions + 10, totalSessions);
    setLoadingSessions([...Array(nextBatch).keys()]);
    setVisibleSessions(nextBatch);
  };

  const handleLoadAll = async () => {
    setLoadingSessions([...Array(totalSessions).keys()]);
    setVisibleSessions(totalSessions);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserSessions(userId));
      dispatch(getAllUsers());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchSessionDetails = async (startIndex, endIndex) => {
      const details = await Promise.all(
        userSessions.slice(startIndex, endIndex).map(async (session) => {
          const geolocationInfo = session.geolocation
            ? await getGeolocationInfo(session.geolocation)
            : null;

          const ipInfo = session.ipAddress
            ? await getIPInfo(session.ipAddress)
            : null;

          return { ...session, geoInfo: geolocationInfo, ipInfo };
        })
      );

      setSessionDetails((prevDetails) => {
        const updatedDetails = [...prevDetails];
        details.forEach((detail, index) => {
          const sessionIndex = startIndex + index;
          if (!updatedDetails.some(({ _id }) => _id === detail._id)) {
            updatedDetails[sessionIndex] = detail;
          }
        });
        setLoadingSessions([]);
        return updatedDetails;
      });
    };

    if (userSessions && visibleSessions > 0) {
      setLoadingSessions([...Array(visibleSessions).keys()]);
      fetchSessionDetails(visibleSessions - 10, visibleSessions);
    }
  }, [userSessions, visibleSessions]);

  const user = allUsers?.find(({ _id }) => _id === userId);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEndSession = (tokenId) => {
    dispatch(endSession(tokenId));
    dispatch(getUserSessions(userId));
  };

  const isSessionExpired = (createdAt) => {
    const sessionAge = Date.now() - new Date(createdAt).getTime();
    return sessionAge > SESSION_EXPIRES_TIME * 1000;
  };

  return (
    <div className={styles['user-sessions']}>
      <div className={styles['content']}>
        <button className={styles['back-button']} onClick={handleBack}>
          Back
        </button>
        <h2>User Sessions</h2>
        {user && <h3>{user.nickname} | Sessions</h3>}
        {userSessions && userSessions.length > 0 ? (
          <div>
            <table className={styles['sessions-table']}>
              <thead>
                <tr>
                  <th>Session Created At</th>
                  <th>IP Address</th>
                  <th>Provider Info</th>
                  <th>Geolocation</th>
                  <th>Geolocation Info</th>
                  <th>Operating System</th>
                  <th>Browser</th>
                  <th>Session Status</th>
                </tr>
              </thead>
              <tbody>
                {userSessions
                  .slice(0, visibleSessions)
                  .map((session, index) => {
                    const {
                      _id,
                      createdAt,
                      ipAddress,
                      geolocation,
                      operatingSystem,
                      browser,
                      isRevoked,
                    } = session;
                    const sessionDetail = session.isRevoked
                      ? null
                      : sessionDetails.find(
                          (detail) => detail && detail.token === session.token
                        );

                    const { ipInfo, geoInfo } = sessionDetail || {};

                    const ipCountryCode = ipInfo?.countryCode || 'unknown';
                    const ipCountry = ipInfo?.country || 'Unknown';
                    const ipCity = ipInfo?.city || 'Unknown';
                    const ipProvider = ipInfo?.provider || 'Unknown';

                    const geoCountryCode = geoInfo?.countryCode || 'unknown';
                    const geoCountry = geoInfo?.country || 'Unknown';
                    const geoRegion = geoInfo?.region || 'Unknown';
                    const geoCity = geoInfo?.city || 'Unknown';
                    const geoStreet = geoInfo?.street || 'Unknown';
                    const { latitude, longitude } = geoInfo || {};

                    return (
                      <tr key={_id}>
                        <td>{`${formatDateTime(createdAt)} | ${timeAgo(
                          createdAt
                        )}`}</td>
                        <td>{ipAddress || 'Unknown'}</td>
                        <td>
                          {!sessionDetail && loadingSessions.includes(index) ? (
                            'Loading...'
                          ) : ipInfo ? (
                            <>
                              <img
                                src={`https://flagcdn.com/16x12/${ipCountryCode}.png`}
                                alt={ipCountry}
                              />
                              {` ${ipCountry}, ${ipCity}, ${ipProvider}`}
                            </>
                          ) : (
                            'Unknown'
                          )}
                        </td>
                        <td>{geolocation || 'Unknown'}</td>
                        <td>
                          {!sessionDetail && loadingSessions.includes(index) ? (
                            'Loading...'
                          ) : geoInfo ? (
                            <a
                              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles['geo-link']}
                            >
                              <img
                                src={`https://flagcdn.com/16x12/${geoCountryCode}.png`}
                                alt={geoCountry}
                              />
                              {`${geoCountry}, ${geoRegion}, ${geoCity}, ${geoStreet}`}
                            </a>
                          ) : (
                            'Unknown'
                          )}
                        </td>
                        <td>{operatingSystem || 'Unknown'}</td>
                        <td>{browser || 'Unknown'}</td>
                        <td>
                          {isRevoked ? (
                            'Revoked'
                          ) : isSessionExpired(createdAt) ? (
                            'Session expired'
                          ) : (
                            <button onClick={() => handleEndSession(_id)}>
                              End session
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className={styles['load-buttons']}>
              <button
                onClick={handleLoadMore}
                disabled={!hasMoreSessions}
                className={styles['load-more-button']}
              >
                Load More
              </button>
              <button
                onClick={handleLoadAll}
                disabled={!hasMoreSessions}
                className={styles['load-all-button']}
              >
                Load All
              </button>
            </div>
          </div>
        ) : (
          <p>No sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSessions;
