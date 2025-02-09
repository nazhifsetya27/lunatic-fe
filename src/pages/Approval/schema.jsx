import * as Yup from 'yup'

const actionSchema = Yup.object().shape({
  // description: Yup.string().required('Reason notes is a required field'),
})

export { actionSchema }
