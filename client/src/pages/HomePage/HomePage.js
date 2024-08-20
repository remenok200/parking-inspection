import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [state, setState] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      navigate('/officers');
    }
  }, []);

  const buttonHandler = () => {
    setState((state) => !state);
  };

  const textButton = state ? 'SignUp' : 'SignIn';

  return (
    <>
      <header>
        <button onClick={buttonHandler} className={styles.button}>
          {textButton}
        </button>
      </header>
      <main>{state ? <SignIn /> : <SignUp />}</main>
    </>
  );
};

export default HomePage;
