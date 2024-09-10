import React, { useState, useEffect } from 'react';
import { protocolValidationSchema } from '../../schemas/protocolValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateProtocol } from '../../redux/slices/protocolSlice';
import { useDispatch } from 'react-redux';
import styles from './UpdateProtocol.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getProtocolById } from '../../API';
import Spinner from '../Spinner/Spinner';

const UpdateProtocol = () => {
  const { protocolID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [protocol, setProtocol] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (protocolID) {
      setLoading(true);
      getProtocolById(protocolID)
        .then(({ data: { data } }) => {
          setProtocol(data);
        })
        .catch((err) => {
          console.error('Failed to fetch protocol data:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [protocolID]);

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

  if (!protocol) {
    return (
      <h1>Protocol not found! Please check if the officer id is correct</h1>
    );
  }

  const initialValues = {
    serviceNotes: protocol.serviceNotes,
    fineAmount: protocol.fineAmount,
    violatorFullName: protocol.violatorFullName,
    violatorPassportNumber: protocol.violatorPassportNumber,
  };

  const handlerUpdateForm = async (values, { resetForm }) => {
    try {
      await dispatch(
        updateProtocol({
          parkOfficerID: protocol.officerId,
          protocolID: protocol.id,
          updatedData: values,
        })
      );

      resetForm();

      navigate('/protocols');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className={styles['form-title']}>Protocol № {protocol.id} | Edit</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={protocolValidationSchema}
        onSubmit={handlerUpdateForm}
      >
        {(formikProps) => (
          <Form className={styles['form-container']}>
            <label>
              Service Notes:
              <Field as="textarea" name="serviceNotes" autoComplete="off" />
              <ErrorMessage
                name="serviceNotes"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              Fine amount:
              <Field name="fineAmount" autoComplete="off" />
              <ErrorMessage
                name="fineAmount"
                component="div"
                type="number"
                className={styles['form-error']}
              />
            </label>

            <label>
              Violator full name:
              <Field name="violatorFullName" autoComplete="off" />
              <ErrorMessage
                name="violatorFullName"
                component="div"
                className={styles['form-error']}
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
              <button type="submit">Update protocol</button>
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

export default UpdateProtocol;
