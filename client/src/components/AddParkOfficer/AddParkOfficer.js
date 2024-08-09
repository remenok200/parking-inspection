import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addParkOfficer } from '../../redux/slices/parkOfficerSlice';
import { useDispatch } from 'react-redux';
import { parkOfficerValidationSchema } from '../../schemas/parkOfficerValidationSchema';
import { useNavigate } from 'react-router-dom';
import styles from './AddParkOfficer.module.scss';
import { Link } from 'react-router-dom';

const initialValues = {
  fullName: '',
  badgeNumber: '',
  district: '',
};

const AddParkOfficer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddParkOfficerSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addParkOfficer(values));
      resetForm();
      navigate('/officers');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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

export default AddParkOfficer;
