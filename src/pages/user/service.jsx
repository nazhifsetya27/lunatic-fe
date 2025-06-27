//utils
import { get, post, patch, remove } from '../../services/NetworkUtils'

export const Service = {
  getUsers: async (params) => await get('/user', params),
  getUserDetail: async (id, params) => await get(`/user/${id}/detail`, params),
  unitList: async (params) => await get(`/user/unit-list`, params),
  createUser: async (data) => await post('/user', data, 'form-data'),
  showUser: async (id) => await get('/user/' + id),
  updateUser: async (id, data) =>
    await patch('/user/' + id, data, {}, 'form-data'),
  deleteUser: async (id) => await remove('/user/' + id),
  restoreUser: async (id) => await patch('/user/restore/' + id),
}

export default Service
