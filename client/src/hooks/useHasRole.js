import { useSelector } from 'react-redux';

const useHasRole = (requiredRole) => {
  const user = useSelector((state) => state.users.user);

  return user && user.role === requiredRole;
};

export default useHasRole;
