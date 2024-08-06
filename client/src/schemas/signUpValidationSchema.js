import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim()
    .min(3, 'Nickname must be at least 3 characters')
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must be at least 8 characters long, including upper and lower case letters, numbers and special characters (#?!@$ %^&*-)'
    )
    .required(),
});
