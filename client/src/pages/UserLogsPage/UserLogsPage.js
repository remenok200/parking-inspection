import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllLogs, getAllLogsByUserID } from '../../redux/slices/adminSlice';
import styles from './UserLogs.module.scss';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';

const UserLogsPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogs } = useSelector((state) => state.admins);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        {userLogs && userLogs.length > 0 ? (
          <table className={styles['logs-table']}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
              {userLogs.map((log) => {
                const { _id, action, performedBy, timestamp } = log;
                return (
                  <tr key={_id}>
                    <td>{`${formatDateTime(timestamp)} | ${timeAgo(
                      timestamp
                    )}`}</td>
                    <td>{action}</td>
                    <td>{performedBy}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No logs found.</p>
        )}
      </div>
    </div>
  );
};

export default UserLogsPage;