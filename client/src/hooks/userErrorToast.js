import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useErrorToast = () => {
  const errors = useSelector((state) =>
    Object.values(state).map((slice) => slice.error)
  );

  useEffect(() => {
    errors.forEach((error) => {
      if (error) {
        toast.error(error);
      }
    });
  }, [errors]);
};

export default useErrorToast;
