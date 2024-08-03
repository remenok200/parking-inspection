import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  createProtocol,
  getAllProtocols,
} from '../../redux/slices/protocolSlice';
import { useDispatch } from 'react-redux';
import { protocolValidationSchema } from '../../schemas/protocolValidationSchema';
import { customStyles } from '../../common/modals/customStyles';
import styles from './Modals.module.scss';

const initialValues = {
  serviceNotes: '',
  fineAmount: 0,
  violatorFullName: '',
  violatorPassportNumber: '',
};

Modal.setAppElement('#root');

const CreateProtocol = ({
  open,
  setIsOpen,
  parkOfficerID,
  parkOfficerFullName,
}) => {
  const dispatch = useDispatch();

  const handleCreateProtocolSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(createProtocol({ parkOfficerID, protocolData: values }));
      await dispatch(getAllProtocols());
      resetForm();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
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
              <button type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateProtocol;
