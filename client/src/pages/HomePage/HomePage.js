import React, { useState } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [state, setState] = useState(true);

  const buttonHandler = () => {
    setState((state) => !state);
  };

  const textButton = state ? 'SignUp' : 'SignIn';

  return (
    <>
      <header>
        <button onClick={buttonHandler} className={styles.button}>{textButton}</button>
      </header>
      <main>{state ? <SignIn /> : <SignUp />}</main>
    </>
  );
};

export default HomePage;
