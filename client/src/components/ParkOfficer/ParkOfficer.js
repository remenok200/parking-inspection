import React, { useState } from 'react';
import styles from './ParkOfficer.module.scss';
import { useDispatch } from 'react-redux';
import {
  deleteParkOfficer,
  getParkOfficers,
  dismissParkOfficer,
} from '../../redux/slices/parkOfficerSlice';
import DeleteConfirmation from '../Modals/DeleteConfirmation';

const ParkOfficer = ({ parkOfficer }) => {
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const dispatch = useDispatch();

  const deleteHandler = async () => {
    await dispatch(deleteParkOfficer(parkOfficer.id));
    await dispatch(getParkOfficers());
  };

  const dismissHandler = async () => {
    await dispatch(dismissParkOfficer(parkOfficer.id));
    await dispatch(getParkOfficers());
  };

  return (
    <article>
      <h1>{parkOfficer.fullName}</h1>
      <p>Badge number: {parkOfficer.badgeNumber}</p>
      <p>District: {parkOfficer.district}</p>
      <p>{parkOfficer.isWorked ? 'Worked' : 'Not worked'}</p>

      <button onClick={() => setDeleteConfirmationModalOpen(true)}>
        Delete
      </button>
      {deleteConfirmationModalOpen && (
        <DeleteConfirmation
          open={deleteConfirmationModalOpen}
          setIsOpen={setDeleteConfirmationModalOpen}
          officerFullName={parkOfficer.fullName}
          deleteCallback={deleteHandler}
        />
      )}

      <button onClick={dismissHandler}>Dismiss</button>
    </article>
  );
};

export default ParkOfficer;
