import * as Yup from 'yup'

export const schema = Yup.object().shape({
  name: Yup.string().required(),
  kode: Yup.object().required(),
  acquisition_date: Yup.date().nullable(),
  price: Yup.string().nullable(),
  unit: Yup.object().required(),
  building: Yup.object().required(),
  floor: Yup.object().nullable(),
  room: Yup.object().nullable(),
})

export const schemaImport = Yup.object().shape({
  electronics: Yup.mixed()
    .required()
    .test(
      'fileSize',
      'The file is too large',
      (value) => value.size <= 200000000
    ),
})
