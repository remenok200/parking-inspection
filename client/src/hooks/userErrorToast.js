import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useErrorToast = () => {
  const errors = useSelector((state) =>
    Object.values(state).map((slice) => slice.error)
  );

  const lastErrorRef = useRef(null);

  useEffect(() => {
    errors.forEach((error) => {
      if (error && error !== lastErrorRef.current) {
        toast.error(error);
        lastErrorRef.current = error;
      }
    });
  }, [errors]);
};

export default useErrorToast;
