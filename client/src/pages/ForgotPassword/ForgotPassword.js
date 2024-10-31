import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/slices/userSlice';
import styles from './ForgotPassword.module.scss';
import { forgotPasswordValidationSchema } from '../../schemas/forgotPasswordValidationSchema';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(resetPassword(values.email));
      resetForm();
      navigate('/');
    } catch (error) {
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <div className={styles['form-container']}>
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPasswordValidationSchema}
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
