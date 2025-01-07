import { get, post, patch, remove } from '../../../services/NetworkUtils'

const Service = {
  getRoom: async (params) => await get('/settings/storage/room', params),
  showRoom: async (id) => await get(`/settings/storage/room/${id}`),
  createRoom: async (data) => post('/settings/storage/room', data),
  updateRoom: async (id, data) =>
    patch(`/settings/storage/room/${id}`, data, {}, 'form-data'),
  deleteRoom: async (id) => remove(`/settings/storage/room/${id}`),
  restoreRoom: async (id) => patch(`/settings/storage/room/${id}/restore`),
}

export default Service
