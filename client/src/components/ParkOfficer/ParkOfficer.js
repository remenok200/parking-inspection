import React from 'react';
import styles from './ParkOfficer.module.scss';
import { Link } from 'react-router-dom';

const ParkOfficer = ({ parkOfficer }) => {
  return (
    <article className={styles['card-wrapper']}>
      <h1>{parkOfficer.fullName}</h1>
      <p>Badge number: {parkOfficer.badgeNumber}</p>
      <p>District: {parkOfficer.district}</p>
      <p
        className={
          parkOfficer.isWorked
            ? styles['status-worked']
            : styles['status-not-worked']
        }
      >
        {parkOfficer.isWorked ? 'Worked' : 'Not worked'}
      </p>

      <Link to={`/officers/${parkOfficer.id}`}>
        <button style={{ width: '100%' }}>View Details</button>
      </Link>
    </article>
  );
};

export default ParkOfficer;
