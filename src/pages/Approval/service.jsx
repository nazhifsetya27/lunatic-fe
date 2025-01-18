import { get, post, patch, remove } from '../../services/NetworkUtils'

export const Service = {
  getApproval: async (params) => await get(`/approval`, params),
}

export default Service
