import React from 'react';
import Modal from 'react-modal';
import { protocolValidationSchema } from '../../schemas/protocolValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  updateProtocol,
  getAllProtocols,
} from '../../redux/slices/protocolSlice';
import { useDispatch } from 'react-redux';
import { customStyles } from '../../common/modals/customStyles';
import styles from './Modals.module.scss';

Modal.setAppElement('#root');

const UpdateProtocol = ({ open, setIsOpen, protocol, refreshProtocolsList }) => {
  const dispatch = useDispatch();

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
      refreshProtocolsList();
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
              <Field name="serviceNotes" autoComplete="off" />
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

export default UpdateProtocol;
