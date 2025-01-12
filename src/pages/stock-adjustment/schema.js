// Libraries
import * as Yup from 'yup'

export const stockAdjustmentSchema = Yup.object().shape({
  name: Yup.string().required('Stock adjustment name is a required field'),
})

export const ImportValidator = Yup.object().shape({
  terminals: Yup.array().test('fileSize', 'The file is too large', (value) => {
    if (!value?.length) return false // attachment is optional
    return value.find((e) => e).size <= 200000000
  }),
})
