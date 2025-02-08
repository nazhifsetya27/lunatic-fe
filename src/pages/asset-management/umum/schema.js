import * as Yup from 'yup'

export const schema = Yup.object().shape({
  name: Yup.string().required(),
  kode: Yup.object().required(),
  unit: Yup.object().required(),
  building: Yup.object().required(),
  floor: Yup.object().nullable(),
  room: Yup.object().nullable(),
})

export const schemaImport = Yup.object().shape({
  umums: Yup.mixed()
    .required()
    .test(
      'fileSize',
      'The file is too large',
      (value) => value.size <= 200000000
    ),
})
