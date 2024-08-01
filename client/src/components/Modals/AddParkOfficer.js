import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { addParkOfficer, getParkOfficers } from '../../redux/slices/parkOfficerSlice';
import { useDispatch } from 'react-redux';

const parkOfficerValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(3, 'Fullname must be at least 3 characters')
    .required(),
  badgeNumber: yup.string().trim().required(),
  district: yup
    .string()
    .min(5, 'District must be at least 5 characters')
    .required(),
});

const initialValues = {
  fullName: '',
  badgeNumber: '',
  district: ''
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
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
  }

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
            <label>Fullname:
              <Field name='fullName' />
              <ErrorMessage name='fullName' />
            </label>

            <label>Badge number:
              <Field name='badgeNumber' />
              <ErrorMessage name='badgeNumber' />
            </label>

            <label>District:
              <Field name='district' />
              <ErrorMessage name='district' />
            </label>

            <button type='submit'>Add officer</button>
            <button type='button' onClick={() => setIsOpen(false)}>Cancel</button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddParkOfficer;
