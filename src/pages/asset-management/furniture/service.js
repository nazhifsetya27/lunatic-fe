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
  getFurnitureDetail: async (id) => await get(`/asset/furniture/${id}/detail`),
  showFurniture: async (id) => await get(`/asset/furniture/${id}`),
  createFurniture: async (data) => post('/asset/furniture', data),
  updateFurniture: async (id, data) =>
    patch(`/asset/furniture/${id}`, data, {}, 'form-data'),
  deleteFurniture: async (id) => remove(`/asset/furniture/${id}`),
  restoreFurniture: async (id) => patch(`/asset/furniture/${id}/restore`),
}

export default Service
