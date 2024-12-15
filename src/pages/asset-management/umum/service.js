// Utils
import {
  get,
  post,
  patch,
  remove,
  download,
} from '../../../services/NetworkUtils'

const Service = {
  getUmums: async (params) => await get(`/asset/umum`, params),
}

export default Service
