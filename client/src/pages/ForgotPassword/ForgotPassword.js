import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/slices/userSlice';
import styles from './ForgotPassword.module.scss';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Required'),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(resetPassword(values.email));
      resetForm();
    } catch (error) {
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <div className={styles['form-container']}>
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <label>
              Email:
              <Field
                type="email"
                name="email"
                className={styles['input']}
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles['form-error']}
              />
            </label>
            <button type="submit" className={styles['button']}>
              Send Reset Link
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
