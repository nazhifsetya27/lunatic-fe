// Utils
import { get } from '../../../services/NetworkUtils'

const Service = {
  getConditions: async (params) => await get('/settings/condition', params),
}

export default Service
