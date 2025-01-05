import * as Yup from 'yup'

export const schema = Yup.object().shape({
  name: Yup.string().required('nama harus diisi'),
  kode: Yup.string().required('kode harus diisi'),
  unit: Yup.object().required('unit harus diisi'),
  building: Yup.object().required('gedung harus diisi'),
  floor: Yup.object().required('lantai harus diisi'),
  room: Yup.object().required('ruangan harus diisi'),
})
