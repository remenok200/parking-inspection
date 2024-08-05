import React from 'react';
import styles from './CustomArrows.module.scss';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className={`${styles.customArrow} ${styles.prevArrow}`}
      onClick={onClick}
    >
      <ArrowBack fontSize="large" className={styles.icon} />
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
      <ArrowForward fontSize="large" className={styles.icon} />
    </div>
  );
};

export { CustomPrevArrow, CustomNextArrow };
