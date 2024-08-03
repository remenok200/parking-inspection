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
      <h2>Add officer</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={parkOfficerValidationSchema}
        onSubmit={handleAddParkOfficerSubmit}
      >
        {(formikProps) => (
          <Form>
            <label>
              Fullname:
              <Field name="fullName" autoComplete="off" />
              <ErrorMessage name="fullName" />
            </label>

            <label>
              Badge number:
              <Field name="badgeNumber" autoComplete="off" />
              <ErrorMessage name="badgeNumber" />
            </label>

            <label>
              District:
              <Field name="district" autoComplete="off" />
              <ErrorMessage name="district" />
            </label>

            <button type="submit">Add officer</button>
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddParkOfficer;
