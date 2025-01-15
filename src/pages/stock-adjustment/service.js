import { get, post, patch, remove, download } from '../../services/NetworkUtils'

const Service = {
  getStockAdjustment: async (params) => await get('/stock-adjustment', params),
  getStockAdjustmentDetail: async (id, params) =>
    await get(`/stock-adjustment/${id}/detail`, params),
  getDetailStockAdjustmentResult: async (id, params) =>
    await get(`/stock-adjustment/${id}/detail-stock-adjustment-result`, params),
  downloadExport: (id, params) =>
    download(`/v1/stock-adjustment/${id}/export`, params),

  /* Details-Item */
  getTerminalDetail: async (id, params) =>
    await get(`/v1/inventory-management/terminal/${id}/detail`, params),
  getSamCardDetail: async (id, params) =>
    get(`/v1/inventory-management/sam-card/${id}/detail`, params),
  getSimCardDetail: async (id, params) =>
    get(`/v1/inventory-management/sim-card/${id}/detail`, params),
  getPeripheralDetail: async (id, params) =>
    await get(`/v1/inventory-management/peripheral/${id}/detail`, params),
  getThermalDetail: async (id, params) =>
    await get(`/v1/inventory-management/thermal/${id}/detail`, params),

  createStockAdjustment: async (data) => post('/stock-adjustment', data),
  updateStockAdjustment: async (id, data) =>
    patch(`/v1/stock-adjustment/${id}`, data, {}, 'form-data'),

  searchWarehouse: async (query) => get('/v1/option/warehouse-list', query),
}

export default Service
