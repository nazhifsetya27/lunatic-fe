// Utils
import { get, post, patch, remove } from '../../../services/NetworkUtils'

const Service = {
  getBuildings: async (params) =>
    await get('/settings/storage/building', params),
  showBuilding: async (id) => await get(`/settings/storage/building/${id}`),
  createBuilding: async (data) => post('/settings/storage/building', data),
  updateBuilding: async (id, data) =>
    patch(`/settings/storage/building/${id}`, data, {}, 'form-data'),
  deleteBuilding: async (id) => remove(`/settings/storage/building/${id}`),
  restoreBuilding: async (id) =>
    patch(`/settings/storage/building/${id}/restore`),
}

export default Service
