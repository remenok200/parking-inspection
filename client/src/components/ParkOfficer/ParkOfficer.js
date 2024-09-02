import React, { useState } from 'react';
import styles from './ParkOfficer.module.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteParkOfficer,
  getParkOfficers,
  dismissParkOfficer,
  restoreParkOfficer,
} from '../../redux/slices/parkOfficerSlice';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import cx from 'classnames';
import useHasRole from '../../hooks/useHasRole';

const ParkOfficer = ({ parkOfficer }) => {
  const isAdmin = useHasRole('admin');

  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [dismissConfirmationModalOpen, setDismissConfirmationModalOpen] =
    useState(false);
  const [restoreConfirmationModalOpen, setRestoreConfirmationModalOpen] =
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

  const restoreHandler = async () => {
    await dispatch(restoreParkOfficer(parkOfficer.id));
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
        <Link to={`/protocols/${parkOfficer.id}`}>
          <button>View protocols</button>
        </Link>

        {parkOfficer.isWorked && isAdmin && (
          <>
            <Link to={`/protocols/create/${parkOfficer.id}`}>
              <button>Create protocol</button>
            </Link>
          </>
        )}

        {isAdmin && (
          <>
            <div>
              <button onClick={() => setDeleteConfirmationModalOpen(true)}>
                Delete
              </button>
            </div>
            {deleteConfirmationModalOpen && (
              <ConfirmationModal
                open={deleteConfirmationModalOpen}
                setIsOpen={setDeleteConfirmationModalOpen}
                action={'delete'}
                itemName={parkOfficer.fullName}
                deleteCallback={deleteHandler}
              />
            )}
          </>
        )}

        {isAdmin && (
          <Link to={`/officers/edit/${parkOfficer.id}`}>
            <button>Edit</button>
          </Link>
        )}

        {parkOfficer.isWorked && isAdmin && (
          <>
            <div>
              <button onClick={() => setDismissConfirmationModalOpen(true)}>
                Dismiss
              </button>
            </div>
            {dismissConfirmationModalOpen && (
              <ConfirmationModal
                open={dismissConfirmationModalOpen}
                setIsOpen={setDismissConfirmationModalOpen}
                action={'dismiss'}
                itemName={parkOfficer.fullName}
                deleteCallback={dismissHandler}
              />
            )}
          </>
        )}

        {!parkOfficer.isWorked && isAdmin && (
          <>
            <div>
              <button onClick={() => setRestoreConfirmationModalOpen(true)}>
                Restore officer
              </button>
            </div>
            {restoreConfirmationModalOpen && (
              <ConfirmationModal
                open={restoreConfirmationModalOpen}
                setIsOpen={setRestoreConfirmationModalOpen}
                action={'restore'}
                itemName={parkOfficer.fullName}
                deleteCallback={restoreHandler}
              />
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default ParkOfficer;
