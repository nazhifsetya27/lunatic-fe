// Utils
import {
  get,
  post,
  patch,
  remove,
  download,
} from '../../../services/NetworkUtils'

const Service = {
  getFurnitures: async (params) => await get(`/asset/furniture`, params),
}

export default Service
