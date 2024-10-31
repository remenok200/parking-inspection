import * as yup from 'yup';

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Required'),
});
