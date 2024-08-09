import React, { useState, useEffect } from 'react';
import { protocolValidationSchema } from '../../schemas/protocolValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateProtocol } from '../../redux/slices/protocolSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UpdateProtocol.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProtocol = () => {
  const { protocolID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { protocols } = useSelector((state) => state.protocols);
  const [protocol, setProtocol] = useState(null);

  useEffect(() => {
    const fetchProtocol = () => {
      const foundProtocol = protocols.find(
        (protocol) => protocol.id === parseInt(protocolID)
      );
      setProtocol(foundProtocol);
    };

    fetchProtocol();
  }, [protocolID, protocols, dispatch]);

  if (!protocol) {
    return;
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
