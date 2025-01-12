// Libraries
import * as Yup from 'yup'

export const peripheralAndThermalSchema = Yup.object().shape({
  adjustments: Yup.array().of(
    Yup.object().shape({
      condition: Yup.object().required('Condition is required'),
      rack: Yup.object().required('Rack is required'),
      qty: Yup.string().required('Quantity is required'),
    })
  ),
  evidence: Yup.mixed()
    .required('Evidence is a required field')
    .test(
      'fileType',
      'The file must be an image',
      (value) =>
        value && (value.type === 'image/jpeg' || value.type === 'image/png')
    ),
})

export const terminalSchema = Yup.object().shape({
  adjustments: Yup.array().of(
    Yup.object().shape({
      condition: Yup.object().required('Condition is required'),
      sn: Yup.object().required('Terminal SN is required'),
    })
  ),
  evidence: Yup.mixed()
    .required('Evidence is a required field')
    .test(
      'fileType',
      'The file must be an image',
      (value) =>
        value && (value.type === 'image/jpeg' || value.type === 'image/png')
    ),
})

export const assetSchema = Yup.object().shape({
  current_condition: Yup.object().required('current conditionis required!'),
  evidence: Yup.mixed()
    .required('Evidence is a required field')
    .test(
      'fileType',
      'The file must be an image',
      (value) =>
        value && (value.type === 'image/jpeg' || value.type === 'image/png')
    ),
})
