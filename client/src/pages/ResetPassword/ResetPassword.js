import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updatePassword } from '../../redux/slices/userSlice';
import styles from './ResetPassword.module.scss';

const validationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must be at least 8 characters long, including upper and lower case letters, numbers and special characters (#?!@$ %^&*-)'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  const handleSubmit = async (values) => {
    try {
      await dispatch(
        updatePassword({ token, newPassword: values.newPassword })
      );
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className={styles['form-container']}>
      <h2>Reset Password</h2>
      <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
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
