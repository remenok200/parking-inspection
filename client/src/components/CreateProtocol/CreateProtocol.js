import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createProtocol } from '../../redux/slices/protocolSlice';
import { useDispatch, useSelector } from 'react-redux';
import { protocolValidationSchema } from '../../schemas/protocolValidationSchema';
import styles from './CreateProtocol.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const initialValues = {
  serviceNotes: '',
  fineAmount: 0,
  violatorFullName: '',
  violatorPassportNumber: '',
};

const CreateProtocol = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parkOfficerID } = useParams();

  const [parkOfficerFullName, setParkOfficerFullName] = useState('');

  const { parkOfficers } = useSelector((state) => state.parkOfficers);

  useEffect(() => {
    const officer = parkOfficers.find(
      (officer) => officer.id === parseInt(parkOfficerID)
    );
    if (officer) {
      setParkOfficerFullName(officer.fullName);
    }
  }, [parkOfficerID, parkOfficers]);

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
        {parkOfficerFullName} | Create protocol
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
              <Link to="/officers">
                <button>Cancel</button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateProtocol;
