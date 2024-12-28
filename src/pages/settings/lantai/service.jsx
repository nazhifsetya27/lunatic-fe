// Utils
import { get } from '../../../services/NetworkUtils'

const Service = {
  getFloors: async (params) => await get('/settings/storage/floor', params),
}

export default Service
