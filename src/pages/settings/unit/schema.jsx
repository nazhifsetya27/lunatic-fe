// Libraries
import * as Yup from 'yup'

export const Schema = Yup.object().shape({
  name: Yup.string().required(),
  kode: Yup.string().required(),
})

export const ImportValidator = Yup.object().shape({
  warehouses: Yup.array().test('fileSize', 'The file is too large', (value) => {
    if (!value?.length) return false // attachment is optional
    return value.find((e) => e).size <= 200000000
  }),
})
