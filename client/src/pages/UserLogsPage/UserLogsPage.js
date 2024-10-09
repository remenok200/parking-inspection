import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getAllLogs,
  getAllLogsByUserID,
  getLogActionTypes,
} from '../../redux/slices/adminSlice';
import styles from './UserLogs.module.scss';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';

const UserLogsPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogs, logActionTypes } = useSelector((state) => state.admins);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterActionType, setFilterActionType] = useState('');

  const filteredLogs = (userLogs, filterActionType) => {
    if (!filterActionType) return userLogs;
    return userLogs.filter((log) => log.actionType === filterActionType);
  };

  const filteredLogsArray = filteredLogs(userLogs, filterActionType);

  const [visibleLogs, setVisibleLogs] = useState(10);
  const totalLogs = filteredLogsArray ? filteredLogsArray.length : 0;
  const hasMoreLogs = visibleLogs < totalLogs;

  useEffect(() => {
    dispatch(getLogActionTypes());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getAllLogsByUserID(userId));
    } else {
      dispatch(getAllLogs());
    }
  }, [dispatch, userId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLoadMore = () => {
    setVisibleLogs((prev) => Math.min(prev + 10, totalLogs));
  };

  const handleLoadAll = () => {
    setVisibleLogs(totalLogs);
  };

  return (
    <div className={styles['user-logs']}>
      <div className={styles['content']}>
        {userId ? (
          <button className={styles['back-button']} onClick={handleBack}>
            Back
          </button>
        ) : (
          <AdminSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}
        <h2>User Logs</h2>
        {userId && <h3>Logs for User ID: {userId}</h3>}

        <div className={styles['filter-container']}>
          <label htmlFor="action-type-filter">Filter by Action Type:</label>
          <select
            value={filterActionType}
            onChange={(e) => setFilterActionType(e.target.value)}
            className={styles['filter-select']}
          >
            <option value="">All Actions</option>
            {Array.isArray(logActionTypes) && logActionTypes.length > 0 ? (
              logActionTypes.map(({ _id, type }) => (
                <option key={_id} value={type}>
                  {type}
                </option>
              ))
            ) : (
              <option disabled>No action types available</option>
            )}
          </select>
        </div>

        {filteredLogsArray && filteredLogsArray.length > 0 ? (
          <div>
            <table className={styles['logs-table']}>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th className={styles['action-column']}>
                    Action Description
                  </th>
                  <th>Action Type</th>
                  <th>Performed By</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogsArray.slice(0, visibleLogs).map((log) => {
                  const {
                    _id,
                    description,
                    actionType,
                    performedBy,
                    timestamp,
                  } = log;
                  return (
                    <tr key={_id}>
                      <td>{`${formatDateTime(timestamp)} | ${timeAgo(
                        timestamp
                      )}`}</td>
                      <td>{description}</td>
                      <td>{actionType}</td>
                      <td>{performedBy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles['load-buttons']}>
              <button
                onClick={handleLoadMore}
                disabled={!hasMoreLogs}
                className={styles['load-more-button']}
              >
                Load More
              </button>
              <button
                onClick={handleLoadAll}
                disabled={!hasMoreLogs}
                className={styles['load-all-button']}
              >
                Load All
              </button>
            </div>
          </div>
        ) : (
          <p>No logs found.</p>
        )}
      </div>
    </div>
  );
};

export default UserLogsPage;
