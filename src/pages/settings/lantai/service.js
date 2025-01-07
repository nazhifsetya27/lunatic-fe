import { get, post, patch, remove } from '../../../services/NetworkUtils'

const Service = {
  getFloor: async (params) => await get('/settings/storage/floor', params),
  showFloor: async (id) => await get(`/settings/storage/floor/${id}`),
  createFloor: async (data) => post('/settings/storage/floor', data),
  updateFloor: async (id, data) =>
    patch(`/settings/storage/floor/${id}`, data, {}, 'form-data'),
  deleteFloor: async (id) => remove(`/settings/storage/floor/${id}`),
  restoreFloor: async (id) => patch(`/settings/storage/floor/${id}/restore`),
}

export default Service
