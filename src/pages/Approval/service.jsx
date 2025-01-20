import { get, post, patch, remove } from '../../services/NetworkUtils'

export const Service = {
  getApproval: async (params) => await get(`/approval`, params),
  getDetail: async (id) => await get(`/approval/${id}`),
  updateApproval: async (id, data) => await patch('/approval/' + id, data),
}

export default Service
