import React from 'react';
import styles from './CustomArrows.module.scss';

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className={`${styles.customArrow} ${styles.prevArrow}`}
      onClick={onClick}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className={`${styles.customArrow} ${styles.nextArrow}`}
      onClick={onClick}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export { CustomPrevArrow, CustomNextArrow };
