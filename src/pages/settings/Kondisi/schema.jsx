// Libraries
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
  name: Yup.string().required(),
  code: Yup.string().required(),
  phone_number: Yup.string()
    .matches(
      /^(^(62)[0-9]{7,15}$|^(0)[0-9]{7,15}$)$/,
      'phone number must be a valid number'
    )
    .required(),
  province: Yup.object().required(),
  city: Yup.object().required(),
  district: Yup.object().required(),
  sub_district: Yup.object().required(),
  zip_code: Yup.object().required(),
  address: Yup.string().required(),
  // territory_type: Yup.string().required(),
  // adm_areas: Yup.array().required(),
})

export const ImportValidator = Yup.object().shape({
  warehouses: Yup.array().test('fileSize', 'The file is too large', (value) => {
    if (!value?.length) return false // attachment is optional
    return value.find((e) => e).size <= 200000000
  }),
})
