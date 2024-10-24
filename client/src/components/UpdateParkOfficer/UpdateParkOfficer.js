import React, { useEffect } from 'react';
import { parkOfficerValidationSchema } from '../../schemas/parkOfficerValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateParkOfficer } from '../../redux/slices/parkOfficerSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UpdateParkOfficer.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getParkOfficerById } from '../../redux/slices/parkOfficerSlice';
import { Save, Cancel } from '@mui/icons-material';

const UpdateParkOfficer = () => {
  const { parkOfficerID } = useParams();
  const { selectedParkOfficer } = useSelector((state) => state.parkOfficers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (parkOfficerID) {
      dispatch(getParkOfficerById(parkOfficerID));
    }
  }, [parkOfficerID]);

  if (!selectedParkOfficer) {
    return (
      <h1>Officer not found! Please check if the protocol ID is correct</h1>
    );
  }

  const initialValues = {
    fullName: selectedParkOfficer.fullName,
    badgeNumber: selectedParkOfficer.badgeNumber,
    district: selectedParkOfficer.district,
  };

  const handlerUpdateForm = async (values, { resetForm }) => {
    try {
      await dispatch(
        updateParkOfficer({
          parkOfficerID: selectedParkOfficer.id,
          updatedData: values,
        })
      );
      resetForm();

      navigate('/officers');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className={styles['form-title']}>
        {selectedParkOfficer.fullName} | Edit
      </h2>
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
              <button type="submit">
                <Save fontSize="small" /> Update officer
              </button>
              <button type="button" onClick={() => navigate(-1)}>
                <Cancel fontSize="small" /> Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateParkOfficer;
