import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './MyProfile.module.scss';

const MyProfile = () => {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className={styles.profileWrapper}>
        <button onClick={() => navigate(-1)} className={styles['back-button']}>
          Back
        </button>
        <div className={styles.profileContainer}>
          <div className={styles.cardWrapper}>
            <h1 className={styles.formTitle}>Just a moment...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => navigate(-1)} className={styles['back-button']}>
        Back
      </button>

      <div className={styles.profileWrapper}>
        <div className={styles.profileContainer}>
          <div className={styles.cardWrapper}>
            <h1 className={styles.formTitle}>My Profile</h1>
            <p>Nickname: {user.nickname}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
