import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './SignUp.module.scss';
import { signUpValidationSchema } from '../../schemas/signUpValidationSchema';
import { useDispatch } from 'react-redux';
import {
  registerUser,
  registerUserWithGoogle,
} from '../../redux/slices/userSlice';
import { auth, googleProvider, signInWithPopup } from '../../services/firebase';
import GoogleIcon from '@mui/icons-material/Google';

const initialValues = {
  nickname: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const dispatch = useDispatch();

  const handleSubmitSignUp = async (values, { resetForm }) => {
    await dispatch(registerUser(values));
    resetForm();
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = result.user.accessToken;
      await dispatch(registerUserWithGoogle(token));
    } catch (error) {
      console.error('Error with Google Sign Up:', error);
    }
  };

  return (
    <>
      <h2 className={styles['form-title']}>Sign up</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitSignUp}
        validationSchema={signUpValidationSchema}
      >
        {(formikProps) => (
          <Form className={styles['form-container']}>
            <label>
              Nickname:
              <Field
                name="nickname"
                className={styles['input']}
                placeholder="superUser123"
                autoComplete="off"
              />
              <ErrorMessage
                name="nickname"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              Email:
              <Field
                name="email"
                className={styles['input']}
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
                className={styles['input']}
                placeholder="gr3at@3wdsG"
                autoComplete="off"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <div className={styles['button-container']}>
              <button type="submit" className={styles['button']}>
                Registration
              </button>
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className={styles['button']}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <GoogleIcon style={{ marginRight: '8px' }} />
                  Sign Up with Google
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
