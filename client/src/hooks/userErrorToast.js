import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useErrorToast = () => {
  const errors = [
    useSelector((state) => state.users.error),
    useSelector((state) => state.protocols.error),
    useSelector((state) => state.parkOfficers.error),
  ];

  useEffect(() => {
    errors.forEach((error) => {
      if (error) {
        toast.error(error);
      }
    });
  }, [errors]);
};

export default useErrorToast;
