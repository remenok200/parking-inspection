import React, { useState, useEffect } from 'react';
import { parkOfficerValidationSchema } from '../../schemas/parkOfficerValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateParkOfficer } from '../../redux/slices/parkOfficerSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UpdateParkOfficer.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateParkOfficer = () => {
  const { parkOfficerID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { parkOfficers } = useSelector((state) => state.parkOfficers);
  const [officer, setOfficer] = useState(null);

  useEffect(() => {
    const fetchOfficer = () => {
      const foundOfficer = parkOfficers.find(
        (officer) => officer.id === parseInt(parkOfficerID)
      );
      setOfficer(foundOfficer);
    };

    fetchOfficer();
  }, [parkOfficerID, parkOfficers, dispatch]);

  if (!officer) {
    return;
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
