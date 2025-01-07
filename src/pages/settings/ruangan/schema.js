import * as Yup from 'yup'

export const Schema = Yup.object().shape({
  name: Yup.string().required(),
  kode: Yup.string().required(),
  description: Yup.string().optional(),
})
