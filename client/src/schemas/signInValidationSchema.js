import * as yup from 'yup';

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().trim().required(),
});
