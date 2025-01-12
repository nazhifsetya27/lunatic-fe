// Utils
import { get, post, patch, remove, download } from '../../services/NetworkUtils'

const Service = {
  getStockAdjustmentInventory: async (params, id) =>
    await get(`/stock-adjustment-inventory/${id}`, params),
  getStockAdjustment: async (params) =>
    await get('/v1/stock-adjustment', params), // utuk ambil id stock_adjustment
  getStockAdjustmentDetail: async (stock_adjustment_id, inventory_id) =>
    await get(
      `/v1/stock-adjustment-inventory/${stock_adjustment_id}/${inventory_id}`
    ),

  createStockAdjustmentInventory: async (data) =>
    post('/stock-adjustment-inventory', data),
  adjustInventory: async (data, stock_adjustment_inventory_id) =>
    patch(
      `/stock-adjustment-inventory/${stock_adjustment_inventory_id}`,
      data,
      {},
      'form-data'
    ),
  submitInventory: async (stock_adjustment_id) =>
    patch(`/v1/stock-adjustment-inventory/${stock_adjustment_id}`),
  deleteStockAdjustmentInventory: async (stock_adjustment_inventory_ids) =>
    remove(`/v1/stock-adjustment-inventory`, stock_adjustment_inventory_ids),

  searchInventoryList: async (query) => get('/option/asset-list', query),
  searchTerminalSNList: async (query) => get(`/v1/option/terminal-list`, query),
  searchConditionList: async (query) => get(`/option/condition-list/`, query),
  searchRackList: async (query) => get(`/v1/option/rack-list/`, query),
  showRackManagementList: async (params) =>
    await get(`/v1/option/show-rack-management-list`, params),
}

export default Service
