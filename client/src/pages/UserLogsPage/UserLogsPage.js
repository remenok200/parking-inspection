import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllLogs, getAllLogsByUserID } from '../../redux/slices/adminSlice';
import styles from './UserLogs.module.scss';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import { ACTION_TYPES_FILTER } from '../../constants';
import { filteredLogs } from '../../utils/filteredLogs';

const UserLogsPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogs } = useSelector((state) => state.admins);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterAction, setFilterAction] = useState('');

  const filteredLogsArray = filteredLogs(userLogs, filterAction);

  const [visibleLogs, setVisibleLogs] = useState(10);
  const totalLogs = filteredLogsArray ? filteredLogsArray.length : 0;
  const hasMoreLogs = visibleLogs < totalLogs;

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
          <label htmlFor="action-filter">Filter by Action:</label>
          <select
            id="action-filter"
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className={styles['filter-select']}
          >
            <option value="">All Actions</option>
            {Object.values(ACTION_TYPES_FILTER).map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>

        {filteredLogsArray && filteredLogsArray.length > 0 ? (
          <div>
            <table className={styles['logs-table']}>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th className={styles['action-column']}>Action</th>
                  <th>Performed By</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogsArray.slice(0, visibleLogs).map((log) => {
                  const { _id, action, performedBy, timestamp } = log;
                  return (
                    <tr key={_id}>
                      <td>{`${formatDateTime(timestamp)} | ${timeAgo(
                        timestamp
                      )}`}</td>
                      <td className={styles['action-column']}>{action}</td>
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
