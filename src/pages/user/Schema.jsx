// Libraries
import * as Yup from 'yup'

const UserSchema = Yup.object().shape({
  id: Yup.string().nullable(),
  //   login_access: Yup.boolean().required(),
  name: Yup.string()
    .required('Full name is a required field')
    .test(
      'not-empty-string',
      'Full name cannot be empty',
      (value) => value.trim() !== ''
    )
    .test(
      'not-only-special-chars',
      'Full name cannot consist of only special characters',
      (value) => !/^[!@#$%^&*\-_+="\/?\\|]+$/.test(value)
    ),
  email: Yup.string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'email must be a valid email')
    .required(),
  role: Yup.string().required(),
  password: Yup.string()
    .nullable()
    .when('id', {
      is: (v) => v === true,
      then: () => Yup.object().required(),
    }),
  unit_id: Yup.object().required('Unit is a required field'),
})

export default UserSchema
