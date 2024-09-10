import React, { useState, useEffect } from 'react';
import { parkOfficerValidationSchema } from '../../schemas/parkOfficerValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateParkOfficer } from '../../redux/slices/parkOfficerSlice';
import { useDispatch } from 'react-redux';
import styles from './UpdateParkOfficer.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getParkOfficerByID } from '../../API';
import Spinner from '../Spinner/Spinner';

const UpdateParkOfficer = () => {
  const { parkOfficerID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [officer, setOfficer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (parkOfficerID) {
      setLoading(true);
      getParkOfficerByID(parkOfficerID)
        .then(({ data: { data } }) => {
          setOfficer(data[0]);
        })
        .catch((err) => {
          console.error('Failed to fetch park officer data:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [parkOfficerID]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (!officer) {
    return (
      <h1>Officer not found! Please check if the protocol ID is correct</h1>
    );
  }

  const initialValues = {
    fullName: officer.fullName,
    badgeNumber: officer.badgeNumber,
    district: officer.district,
  };

  const handlerUpdateForm = async (values, { resetForm }) => {
    try {
      await dispatch(
        updateParkOfficer({ parkOfficerID: officer.id, updatedData: values })
      );
      resetForm();

      navigate('/officers');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className={styles['form-title']}>{officer.fullName} | Edit</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={parkOfficerValidationSchema}
        onSubmit={handlerUpdateForm}
      >
        {(formikProps) => (
          <Form className={styles['form-container']}>
            <label>
              Fullname:
              <Field name="fullName" autoComplete="off" />
              <ErrorMessage
                name="fullName"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              Badge number:
              <Field name="badgeNumber" autoComplete="off" />
              <ErrorMessage
                name="badgeNumber"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              District:
              <Field name="district" autoComplete="off" />
              <ErrorMessage
                name="district"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <div className={styles['button-container']}>
              <button type="submit">Update officer</button>
              <button type="button" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateParkOfficer;
