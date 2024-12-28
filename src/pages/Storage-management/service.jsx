import { get, post, patch, remove, download } from '../../services/NetworkUtils'

const Service = {
  getUnit: async (params) => await get('/settings/unit', params),
  getStorageManagement: async (unit_id, params) =>
    await get(`/storage-management/${unit_id}`, params),
  createRackManagement: async (data) => await post('/v1/rack-management', data),
  showRackManagement: async (id) => await get(`/v1/rack-management/${id}`),
  updateRackManagement: async (id, data) =>
    await patch(`/v1/rack-management/${id}`, data),
  deleteRackManagement: async (id) => await remove(`/v1/rack-management/${id}`),
  restoreRackManagement: async (id) =>
    await patch(`/v1/rack-management/${id}/restore`),
  downloadTemplateImport: () => download('/v1/rack-management/example'),
  bulkDeleteRackManagement: async (data) =>
    await remove('/v1/rack-management/bulk-delete', data),
  searchRackCategoryList: async (params) =>
    await get('/v1/option/rack-category-list', params),
  validateRack: async (id) =>
    await get(`/v1/rack-management/validate-rack/${id}`),

  searchUnitList: async (params) => await get('/option/unit-list', params),
  searchBuildingList: async (params) =>
    await get('/option/building-list', params),
}

export default Service
