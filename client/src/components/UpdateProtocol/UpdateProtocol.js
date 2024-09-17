import React, { useEffect } from 'react';
import { protocolValidationSchema } from '../../schemas/protocolValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateProtocol } from '../../redux/slices/protocolSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UpdateProtocol.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getProtocolById } from '../../redux/slices/protocolSlice';

const UpdateProtocol = () => {
  const { protocolID } = useParams();
  const { selectedProtocol } = useSelector((state) => state.protocols);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (protocolID) {
      dispatch(getProtocolById(protocolID));
    }
  }, [protocolID]);

  if (!selectedProtocol) {
    return (
      <h1>Protocol not found! Please check if the officer id is correct</h1>
    );
  }

  const initialValues = {
    serviceNotes: selectedProtocol.serviceNotes,
    fineAmount: selectedProtocol.fineAmount,
    violatorFullName: selectedProtocol.violatorFullName,
    violatorPassportNumber: selectedProtocol.violatorPassportNumber,
  };

  const handlerUpdateForm = async (values, { resetForm }) => {
    try {
      await dispatch(
        updateProtocol({
          parkOfficerID: selectedProtocol.officerId,
          protocolID: selectedProtocol.id,
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
      <h2 className={styles['form-title']}>
        Protocol № {selectedProtocol.id} | Edit
      </h2>
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
