import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../redux/slices/userSlice';

const useAuthCheck = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  if(user === null) {
    if (localStorage.getItem('refreshToken')) {
      dispatch(authUser());
    }
  }

  useEffect(() => {
    if (!user) {
      if (localStorage.getItem('refreshToken')) {
        dispatch(authUser());
      }
    }
  }, [dispatch, user]);
};

export default useAuthCheck;
