import * as Yup from 'yup'

export const RackManagementSchema = Yup.object().shape({
  type: Yup.object().required('Type is a required field'),
  index: Yup.string()
    .required('Quantity is a required field')
    .test('not-zero', 'Quantity cannot be 0', (value) => value !== '0'),
})

export const ImportValidator = Yup.object().shape({
  device_type: Yup.array().test(
    'fileSize',
    'The file is too large',
    (value) => {
      if (!value?.length) return false // attachment is optional
      return value.find((e) => e).size <= 200000000
    }
  ),
})
