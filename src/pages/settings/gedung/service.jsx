// Utils
import { get } from '../../../services/NetworkUtils'

const Service = {
  getBuildings: async (params) =>
    await get('/settings/storage/building', params),
}

export default Service
