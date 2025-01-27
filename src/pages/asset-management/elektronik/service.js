// Utils
import {
  get,
  post,
  patch,
  remove,
  download,
} from '../../../services/NetworkUtils'

const Service = {
  getElektronics: async (params) => await get(`/asset/elektronik`, params),
  getElektronikDetail: async (id) =>
    await get(`/asset/elektronik/${id}/detail`),
  getPrint: async (id) => await get(`/asset/furniture/${id}/print`),
  showElektronik: async (id) => await get(`/asset/elektronik/${id}`),
  createElektronik: async (data) => post('/asset/elektronik', data),
  updateElektronik: async (id, data) =>
    patch(`/asset/elektronik/${id}`, data, {}, 'form-data'),
  deleteElektronik: async (id) => remove(`/asset/elektronik/${id}`),
  restoreElektronik: async (id) => patch(`/asset/elektronik/${id}/restore`),
  importElektronik: async (data, config) =>
    await post(
      '/asset/elektronik/import',
      data,
      'form-data',
      undefined,
      config
    ),
  downloadTemplateImport: () => download('/asset/elektronik/example'),
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
  downloadTemplateImport: () => download(`/asset/elektronik/example`),
  downloadExport: (params) => download(`/asset/elektronik/export`, params),
}

export default Service
