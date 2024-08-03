import React, { useState } from 'react';
import styles from './ParkOfficer.module.scss';
import { useDispatch } from 'react-redux';
import {
  deleteParkOfficer,
  getParkOfficers,
  dismissParkOfficer,
} from '../../redux/slices/parkOfficerSlice';
import DeleteConfirmation from '../Modals/DeleteConfirmation';
import UpdateParkOfficer from '../Modals/UpdateParkOfficer';
import CreateProtocol from '../Modals/CreateProtocol';

const ParkOfficer = ({ parkOfficer }) => {
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [updateParkOfficerOpen, setUpdateParkOfficerOpen] = useState(false);
  const [createProtocolModalOpen, setCreateProtocolModalOpen] = useState(false);

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
    <article className={styles['card-wrapper']}>
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
          itemName={parkOfficer.fullName}
          deleteCallback={deleteHandler}
        />
      )}

      <button onClick={() => setUpdateParkOfficerOpen(true)}>Edit</button>
      {updateParkOfficerOpen && (
        <UpdateParkOfficer
          open={updateParkOfficerOpen}
          setIsOpen={setUpdateParkOfficerOpen}
          officer={parkOfficer}
        />
      )}

      {parkOfficer.isWorked && (
        <>
          <button onClick={() => setCreateProtocolModalOpen(true)}>
            Create protocol
          </button>
          {createProtocolModalOpen && (
            <CreateProtocol
              open={createProtocolModalOpen}
              setIsOpen={setCreateProtocolModalOpen}
              parkOfficerID={parkOfficer.id}
              parkOfficerFullName={parkOfficer.fullName}
            />
          )}
        </>
      )}

      {parkOfficer.isWorked && (
        <button onClick={dismissHandler}>Dismiss</button>
      )}
    </article>
  );
};

export default ParkOfficer;
