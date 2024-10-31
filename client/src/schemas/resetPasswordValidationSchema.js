import * as yup from 'yup';

export const resetPasswordValidationSchema = yup.object().shape({
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
