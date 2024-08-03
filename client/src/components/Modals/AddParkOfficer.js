import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  addParkOfficer,
  getParkOfficers,
} from '../../redux/slices/parkOfficerSlice';
import { useDispatch } from 'react-redux';
import { parkOfficerValidationSchema } from '../../schemas/parkOfficerValidationSchema';
import { customStyles } from '../../common/modals/customStyles';
import styles from './Modals.module.scss';

const initialValues = {
  fullName: '',
  badgeNumber: '',
  district: '',
};

Modal.setAppElement('#root');

const AddParkOfficer = ({ open, setIsOpen }) => {
  const dispatch = useDispatch();

  const handleAddParkOfficerSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addParkOfficer(values));
      await dispatch(getParkOfficers());
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
      <h2 className={styles['form-title']}>Add officer</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={parkOfficerValidationSchema}
        onSubmit={handleAddParkOfficerSubmit}
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
              <button type="submit">Add officer</button>
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

export default AddParkOfficer;
