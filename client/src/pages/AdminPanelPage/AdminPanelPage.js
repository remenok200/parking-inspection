import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getAllBannedUsers } from '../../redux/slices/adminSlice';

const AdminPanelPage = () => {
  const { allUsers, bannedUsers, isLoading, error } = useSelector(
    (state) => state.admins
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  
  return <div></div>;
};

export default AdminPanelPage;
