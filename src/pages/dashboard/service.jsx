import { get } from '../../services/NetworkUtils'

export const Service = {
  getPerformance: async (params) => await get('/dashboard', params),
}
