import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ParkOfficerDetailsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteParkOfficer,
  dismissParkOfficer,
  restoreParkOfficer,
  getParkOfficers,
} from '../../redux/slices/parkOfficerSlice';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import useHasRole from '../../hooks/useHasRole';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';

const ParkOfficerDetailsPage = () => {
  const { officerID } = useParams();
  const isAdmin = useHasRole('admin');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const officers = useSelector((state) => state.parkOfficers.parkOfficers);

  const [parkOfficer, setParkOfficer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [dismissConfirmationModalOpen, setDismissConfirmationModalOpen] =
    useState(false);
  const [restoreConfirmationModalOpen, setRestoreConfirmationModalOpen] =
    useState(false);

  useEffect(() => {
    if (!officers.length) {
      dispatch(getParkOfficers());
    } else {
      const officer = officers.find(
        (officer) => officer.id === Number(officerID)
      );
      if (officer) {
        setParkOfficer(officer);
      } else {
        console.error('Officer not found');
      }
      setLoading(false);
    }
  }, [officers, officerID, dispatch]);

  const deleteHandler = async () => {
    await dispatch(deleteParkOfficer(parkOfficer.id));
    navigate('/officers');
  };

  const dismissHandler = async () => {
    await dispatch(dismissParkOfficer(parkOfficer.id));
  };

  const restoreHandler = async () => {
    await dispatch(restoreParkOfficer(parkOfficer.id));
  };

  if (loading) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
          }}
        >
          <Spinner />
        </div>
      </div>
    );
  }

  if (!parkOfficer) {
    return <h1>Officer not found.</h1>;
  }

  return (
    <div className={styles['officer-details']}>
      <button onClick={() => navigate(-1)} className={styles['back-button']}>
        Back
      </button>

      <article className={styles['details']}>
        <h1>{parkOfficer.fullName}</h1>
        <p>Badge number: {parkOfficer.badgeNumber}</p>
        <p>District: {parkOfficer.district}</p>
        <p
          className={
            parkOfficer.isWorked
              ? styles['status-worked']
              : styles['status-not-worked']
          }
        >
          {parkOfficer.isWorked ? 'Worked' : 'Not worked'}
        </p>

        {isAdmin && (
          <div className={styles['button-container']}>
            <Link to={`/protocols/${parkOfficer.id}`}>
              <button style={{ width: '100%' }}>View protocols</button>
            </Link>

            {parkOfficer.isWorked && isAdmin && (
              <Link to={`/protocols/create/${parkOfficer.id}`}>
                <button style={{ width: '100%' }}>Create protocol</button>
              </Link>
            )}

            <button onClick={() => setDeleteConfirmationModalOpen(true)}>
              Delete
            </button>
            <button
              onClick={() => navigate(`/officers/edit/${parkOfficer.id}`)}
            >
              Edit
            </button>
            {parkOfficer.isWorked ? (
              <button onClick={() => setDismissConfirmationModalOpen(true)}>
                Dismiss
              </button>
            ) : (
              <button onClick={() => setRestoreConfirmationModalOpen(true)}>
                Restore
              </button>
            )}
          </div>
        )}

        {deleteConfirmationModalOpen && (
          <ConfirmationModal
            open={deleteConfirmationModalOpen}
            setIsOpen={setDeleteConfirmationModalOpen}
            action={'delete'}
            itemName={parkOfficer.fullName}
            deleteCallback={deleteHandler}
          />
        )}

        {dismissConfirmationModalOpen && (
          <ConfirmationModal
            open={dismissConfirmationModalOpen}
            setIsOpen={setDismissConfirmationModalOpen}
            action={'dismiss'}
            itemName={parkOfficer.fullName}
            deleteCallback={dismissHandler}
          />
        )}

        {restoreConfirmationModalOpen && (
          <ConfirmationModal
            open={restoreConfirmationModalOpen}
            setIsOpen={setRestoreConfirmationModalOpen}
            action={'restore'}
            itemName={parkOfficer.fullName}
            deleteCallback={restoreHandler}
          />
        )}
      </article>
    </div>
  );
};

export default ParkOfficerDetailsPage;
