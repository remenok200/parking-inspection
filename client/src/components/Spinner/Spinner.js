import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Spinner = () => {
  return (
    <HashLoader
      color="#007bff"
      size={100}
      cssOverride={{ display: 'block', margin: '0 auto' }}
    />
  );
};

export default Spinner;
