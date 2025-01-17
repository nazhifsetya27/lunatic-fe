import { post } from '../../services/NetworkUtils'

export const LoginService = {
  login: async (data) => await post('/auth/', data),
  createStockAdjustmentFromQR: async (asset_id) =>
    post(`/stock-adjustment/${asset_id}`),
}
