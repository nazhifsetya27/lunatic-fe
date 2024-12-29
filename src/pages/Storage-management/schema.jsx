import * as Yup from 'yup'

export const StorageManagementSchema = Yup.object().shape({
  buildings: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required('Building ID is required'),
        name: Yup.string().required('Building name is required'),
      })
    )
    .min(1, 'At least one building must be selected')
    .required('Buildings are required'),
})

export const updateStorageManagementSchema = Yup.object().shape({
  level: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required('level ID is required'),
        name: Yup.string().required('level name is required'),
      })
    )
    .min(1, 'At least one level must be selected')
    .required('level are required'),
})

export const ImportValidator = Yup.object().shape({
  device_type: Yup.array().test(
    'fileSize',
    'The file is too large',
    (value) => {
      if (!value?.length) return false // attachment is optional
      return value.find((e) => e).size <= 200000000
    }
  ),
})
