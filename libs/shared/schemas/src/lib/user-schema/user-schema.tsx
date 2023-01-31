import * as yup from 'yup';
import { EMAIL_REGEX, PHONE_REGEX, PASSWORD_REGEX } from '@react-nx/shared/regex';

const userSchema = yup.object().shape({
  first_name: yup.string().required().min(3).max(20),
  last_name: yup.string().required().min(3).max(20),
  email: yup.string().matches(EMAIL_REGEX, { message: "Email is invalid" }),
  phone: yup.string().matches(PHONE_REGEX, { message: "Phone is invalid" }),
  adress: yup.string().min(5),
  password: yup.string().matches(PASSWORD_REGEX, { message: "Password is invalid" }),
  confirm_password: yup.string().matches(PASSWORD_REGEX, { message: "Password is invalid" })
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export default userSchema;