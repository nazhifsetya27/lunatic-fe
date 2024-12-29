import * as Yup from 'yup'

export const schema = Yup.object().shape({
  name: Yup.string().required(),
  kode: Yup.string().required(),
  unit: Yup.object().required(),
  building: Yup.object().required(),
  floor: Yup.object().required(),
  room: Yup.object().required(),
})
