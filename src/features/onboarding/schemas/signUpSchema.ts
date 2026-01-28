import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  username: Yup.string().trim().min(3, 'Too Short!').max(30, 'Too Long!').required(),
  fullname: Yup.string().trim().min(3, 'Too Short!').max(50, 'Too Long!').required(),
  password: Yup.string().trim().min(6, 'Too Short!').max(50, 'Too Long!').required(),
});
