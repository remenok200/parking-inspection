import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './SignIn.module.scss';
import { signInValidationSchema } from '../../schemas/signInValidationSchema';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';

const initialValues = {
  email: '',
  password: ''
};

const SignIn = () => {
  const dispatch = useDispatch();

  const handleSubmitSignIn = async (values, { resetForm }) => {
    await dispatch(loginUser(values));
    resetForm();
  };

  return (
    <>
      <h2 className={styles['form-title']}>Sign in</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitSignIn}
        validationSchema={signInValidationSchema}
      >
        {(formikProps) => (
          <Form className={styles['form-container']}>
            <label>
              Email:
              <Field
                name="email"
                placeholder="superUser@test.com"
                autoComplete="off"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              Password:
              <Field
                name="password"
                type="password"
                placeholder="gr3at@3wdsG"
                autoComplete="off"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <button type='submit'>Login</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignIn;
