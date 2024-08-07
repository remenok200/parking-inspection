import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useErrorToast = () => {
  const usersError = useSelector((state) => state.users.error);
  const protocolsError = useSelector((state) => state.protocols.error);
  const parkOfficersError = useSelector((state) => state.parkOfficers.error);

  useEffect(() => {
    if (usersError) {
      toast.error(usersError);
    }
  }, [usersError]);

  useEffect(() => {
    if (protocolsError) {
      toast.error(protocolsError);
    }
  }, [protocolsError]);

  useEffect(() => {
    if (parkOfficersError) {
      toast.error(parkOfficersError);
    }
  }, [parkOfficersError]);
};

export default useErrorToast;
