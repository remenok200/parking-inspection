import React, { useState } from 'react';
import styles from './ParkOfficer.module.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteParkOfficer,
  getParkOfficers,
  dismissParkOfficer,
} from '../../redux/slices/parkOfficerSlice';
import DeleteConfirmation from '../Modals/DeleteConfirmation';
import UpdateParkOfficer from '../Modals/UpdateParkOfficer';
import CreateProtocol from '../Modals/CreateProtocol';
import cx from 'classnames';

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
      <p
        className={cx({
          [styles['status-worked']]: parkOfficer.isWorked,
          [styles['status-not-worked']]: !parkOfficer.isWorked,
        })}
      >
        {parkOfficer.isWorked ? 'Worked' : 'Not worked'}
      </p>

      <div className={styles['button-container']}>
        <Link to={`/protocols/${parkOfficer.id}/${parkOfficer.fullName}`}>
          <button>View protocols</button>
        </Link>

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
      </div>
    </article>
  );
};

export default ParkOfficer;
