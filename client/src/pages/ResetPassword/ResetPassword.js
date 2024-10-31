import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updatePassword } from '../../redux/slices/userSlice';
import styles from './ResetPassword.module.scss';
import { useNavigate } from 'react-router-dom';
import { resetPasswordValidationSchema } from '../../schemas/resetPasswordValidationSchema';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(
        updatePassword({ token, newPassword: values.newPassword })
      );
      resetForm();
      navigate('/');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className={styles['form-container']}>
      <h2>Reset Password</h2>
      <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <label>
              New Password:
              <Field
                type="password"
                name="newPassword"
                className={styles['input']}
                placeholder="Enter your new password"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className={styles['form-error']}
              />
            </label>
            <label>
              Confirm Password:
              <Field
                type="password"
                name="confirmPassword"
                className={styles['input']}
                placeholder="Confirm your new password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles['form-error']}
              />
            </label>
            <button type="submit" className={styles['button']}>
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
