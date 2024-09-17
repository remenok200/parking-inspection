import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createProtocol } from '../../redux/slices/protocolSlice';
import { useSelector, useDispatch } from 'react-redux';
import { protocolValidationSchema } from '../../schemas/protocolValidationSchema';
import styles from './CreateProtocol.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getParkOfficerById } from '../../redux/slices/parkOfficerSlice';

const initialValues = {
  serviceNotes: '',
  fineAmount: 0,
  violatorFullName: '',
  violatorPassportNumber: '',
};

const CreateProtocol = () => {
  const navigate = useNavigate();
  const { selectedParkOfficer } = useSelector((state) => state.parkOfficers);
  const dispatch = useDispatch();
  const { parkOfficerID } = useParams();

  useEffect(() => {
    if (parkOfficerID) {
      dispatch(getParkOfficerById(parkOfficerID));
    }
  }, [parkOfficerID]);

  if (!selectedParkOfficer) {
    return (
      <h1>
        Oooops! Officer not found! Please check if the officer id is correct
      </h1>
    );
  }

  const handleCreateProtocolSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(createProtocol({ parkOfficerID, protocolData: values }));
      navigate(`/protocols/${parkOfficerID}/`);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className={styles['form-title']}>
        {selectedParkOfficer.fullName} | Create protocol
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={protocolValidationSchema}
        onSubmit={handleCreateProtocolSubmit}
      >
        {(formikProps) => (
          <Form className={styles['form-container']}>
            <label>
              Service notes:
              <Field name="serviceNotes" as="textarea" autoComplete="off" />
              <ErrorMessage
                name="serviceNotes"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              Fine amount:
              <Field name="fineAmount" type="number" autoComplete="off" />
              <ErrorMessage
                name="fineAmount"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              Violator full name:
              <Field name="violatorFullName" autoComplete="off" />
              <ErrorMessage
                name="violatorFullName"
                className={styles['form-error']}
                component="div"
              />
            </label>

            <label>
              Violator passport number:
              <Field name="violatorPassportNumber" autoComplete="off" />
              <ErrorMessage
                name="violatorPassportNumber"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <div className={styles['button-container']}>
              <button type="submit">Create protocol</button>
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

export default CreateProtocol;
