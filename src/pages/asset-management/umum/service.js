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
  getUmumDetail: async (id) => await get(`/asset/umum/${id}/detail`),
  getPrint: async (id) => await get(`/asset/furniture/${id}/print`),
  showUmum: async (id) => await get(`/asset/umum/${id}`),
  createUmum: async (data) => post('/asset/umum', data),
  updateUmum: async (id, data) =>
    patch(`/asset/umum/${id}`, data, {}, 'form-data'),
  deleteUmum: async (id) => remove(`/asset/umum/${id}`),
  restoreUmum: async (id) => patch(`/asset/umum/${id}/restore`),

  // option
  searchUnitList: async (params) =>
    await get('/asset/asset-option/unit-list', params),
  searchBuildingList: async (params) =>
    await get('/asset/asset-option/building-list', params),
  searchFloorList: async (params) =>
    await get('/asset/asset-option/floor-list', params),
  searchRoomList: async (params) =>
    await get('/asset/asset-option/room-list', params),
  searchKodeList: async (params) => await get('/option/kode-list', params),

  // import export
  downloadTemplateImport: () => download('/asset/umum/example'),
  importUmum: async (data, config) =>
    await post('/asset/umum/import', data, 'form-data', undefined, config),
  downloadExport: (params) => download(`/asset/elektronik/export`, params),
}

export default Service
