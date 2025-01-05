// Libraries
import * as Yup from 'yup'

export const ProfileSchema = Yup.object().shape({
  name: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'email must be a valid email')
    .required(),
  whatsapp: Yup.string()
    .matches(
      /^(^(62)[0-9]{7,15}$|^(0)[0-9]{7,15}$)$/,
      'WhatsApp number must be a valid number '
    )
    .required(),
})

export const PasswordProfileSchema = Yup.object().shape({
  old_password: Yup.string()
    .required('Current password is required')
    .min(8, 'Current password must be at least 8 characters'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, '')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#~^\-_+=|`'"\\/:.,])[-A-Za-z\d@$!%*?&#~^\-_+=|`'"\\/:.,]{8,}$/,
      'Invalid format'
    ),
  ConfirmPassword: Yup.string()
    .required('Confirm new password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
})
