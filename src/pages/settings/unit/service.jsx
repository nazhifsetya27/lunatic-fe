// Utils
import { get, patch, remove, post } from '../../../services/NetworkUtils'

const Service = {
  getUnits: async (params) => await get('/settings/unit', params),
  getUnitDetail: async (id) => await get(`/settings/unit/${id}/detail`),
  showUnit: async (id) => await get(`/settings/unit/${id}`),
  createUnit: async (data) => post('/settings/unit', data),
  updateUnit: async (id, data) =>
    patch(`/settings/unit/${id}`, data, {}, 'form-data'),
  deleteUnit: async (id) => remove(`/settings/unit/${id}`),
  restoreUnit: async (id) => patch(`/settings/unit/${id}/restore`),
}

export default Service
