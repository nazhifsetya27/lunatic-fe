// Libraries
import * as Yup from 'yup'

export const assetSchema = Yup.object().shape({
  current_condition: Yup.object().required('Current condition is required!'),
  evidence: Yup.mixed()
    .nullable() // Allows null or undefined values
    .test('fileType', 'The file must be an image', (value) => {
      if (!value) return true // Skip validation if no file is uploaded
      return value.type === 'image/jpeg' || value.type === 'image/png'
    }),
})
