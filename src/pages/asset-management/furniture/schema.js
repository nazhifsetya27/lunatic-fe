import * as Yup from 'yup'

export const schema = Yup.object().shape({
  name: Yup.string().required(),
  kode: Yup.string().required(),
  unit: Yup.object().required(),
  building: Yup.object().required(),
  floor: Yup.object().optional(),
  room: Yup.object().optional(),
})

export const schemaImport = Yup.object().shape({
  furnitures: Yup.mixed()
    .required()
    .test(
      'fileSize',
      'The file is too large',
      (value) => value.size <= 200000000
    ),
})
