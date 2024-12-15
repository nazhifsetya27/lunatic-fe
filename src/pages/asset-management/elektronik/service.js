// Utils
import {
  get,
  post,
  patch,
  remove,
  download,
} from '../../../services/NetworkUtils'

const Service = {
  getElektronics: async (params) => await get(`/asset/elektronik`, params),
  getElektronikDetail: async (id) =>
    await get(`/asset/elektronik/${id}/detail`),
  showElektronik: async (id) => await get(`/asset/elektronik/${id}`),
  createElektronik: async (data) => post('/asset/elektronik', data),
  updateElektronik: async (id, data) =>
    patch(`/asset/elektronik/${id}`, data, {}, 'form-data'),
  deleteElektronik: async (id) => remove(`/asset/elektronik/${id}`),
  restoreElektronik: async (id) => patch(`/asset/elektronik/${id}/restore`),
}

export default Service
