// Utils
import { get } from '../../../services/NetworkUtils'

const Service = {
  getRooms: async (params) => await get('/settings/storage/room', params),
}

export default Service
