import React, { useRef } from 'react';
import Spinner from '../components/Spinner/Spinner';

const withSpinner = (WrappedComponent) => {
  return (props) => {
    const contentRef = useRef(null);

    const { isLoading } = props;

    return (
      <div style={{ position: 'relative' }}>
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1,
            }}
          >
            <Spinner />
          </div>
        )}
        <div
          ref={contentRef}
          style={{
            filter: isLoading ? 'blur(1px)' : 'none',
            transition: 'filter 0.3s ease',
          }}
        >
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
};

export default withSpinner;
