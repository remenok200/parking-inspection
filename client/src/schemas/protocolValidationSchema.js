import * as yup from 'yup';

export const protocolValidationSchema = yup.object().shape({
  serviceNotes: yup
    .string()
    .trim()
    .min(10, 'Service notes must be at least 10 characters')
    .required(),
  fineAmount: yup.number().required(),
  violatorFullName: yup
    .string()
    .trim()
    .min(2, 'Violator full name must be at least 2 characters')
    .required(),
  violatorPassportNumber: yup
    .string()
    .min(5, 'Violator passport number must be at least 5 characters')
    .required(),
});
