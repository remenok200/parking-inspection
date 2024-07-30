import React from 'react';
import styles from './ParkOfficer.module.scss';

const ParkOfficer = ({ parkOfficer }) => {
  return (
    <article>
      <h1>{parkOfficer.fullName}</h1>
      <p>Badge number: {parkOfficer.badgeNumber}</p>
      <p>District: {parkOfficer.district}</p>
      <p>{parkOfficer.isWorked ? 'Worked' : 'Not worked'}</p>
    </article>
  );
}

export default ParkOfficer;
