import React, { useState } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { isLoading, error } = useSelector((state) => state.users);
  const [state, setState] = useState(false);

  const buttonHandler = () => {
    setState((state) => !state);
  };

  const textButton = state ? 'SignUp' : 'SignIn';

  return (
    <>
      <header>
        <button onClick={buttonHandler}>{textButton}</button>
      </header>
      <main>{state ? <SignIn /> : <SignUp />}</main>
    </>
  );
};

export default HomePage;
