import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './SignIn.module.scss';
import { signInValidationSchema } from '../../schemas/signInValidationSchema';
import { useDispatch } from 'react-redux';
import { loginUser, loginUserWithGoogle } from '../../redux/slices/userSlice';
import { auth, googleProvider, signInWithPopup } from '../../services/firebase';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitSignIn = async (values, { resetForm }) => {
    await dispatch(loginUser(values));
    resetForm();
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = result.user.accessToken;
      await dispatch(loginUserWithGoogle(token));
    } catch (error) {
      console.error('Error with Google Sign In:', error);
    }
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

            <div className={styles['forgot-password-container']}>
              <LockIcon style={{ marginRight: '5px', color: '#007bff' }} />
              <span
                className={styles['forgot-password-link']}
                onClick={() => navigate('/forgot-password')}
              >
                I'm forgot password
              </span>
            </div>

            <div className={styles['button-container']}>
              <button type="submit" className={styles['button']}>
                Login
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className={styles['button']}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <GoogleIcon style={{ marginRight: '8px' }} />
                  Sign In with Google
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
