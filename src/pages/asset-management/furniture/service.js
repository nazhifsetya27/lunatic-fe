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
  getPrint: async (id) => await get(`/asset/furniture/${id}/print`),
  showFurniture: async (id) => await get(`/asset/furniture/${id}`),
  createFurniture: async (data) => post('/asset/furniture', data),
  updateFurniture: async (id, data) =>
    patch(`/asset/furniture/${id}`, data, {}, 'form-data'),
  deleteFurniture: async (id) => remove(`/asset/furniture/${id}`),
  restoreFurniture: async (id) => patch(`/asset/furniture/${id}/restore`),

  // option
  searchUnitList: async (params) =>
    await get('/asset/asset-option/unit-list', params),
  searchBuildingList: async (params) =>
    await get('/asset/asset-option/building-list', params),
  searchFloorList: async (params) =>
    await get('/asset/asset-option/floor-list', params),
  searchRoomList: async (params) =>
    await get('/asset/asset-option/room-list', params),

  // import export
  downloadTemplateImport: () => download(`/asset/furniture/example`),
  importFurniture: async (data, config) =>
    await post('/asset/furniture/import', data, 'form-data', undefined, config),
  downloadExport: (params) => download(`/asset/furniture/export`, params),
}

export default Service
