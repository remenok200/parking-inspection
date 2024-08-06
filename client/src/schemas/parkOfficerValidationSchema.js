import * as yup from 'yup';

export const parkOfficerValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(3, 'Fullname must be at least 3 characters')
    .required(),
  badgeNumber: yup.string().trim().required(),
  district: yup
    .string()
    .min(3, 'District must be at least 3 characters')
    .required(),
});