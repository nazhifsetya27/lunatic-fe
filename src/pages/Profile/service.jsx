// utils
import { get, patch } from '../../services/NetworkUtils'

const ProfileService = {
  getProfile: async (params) => await get('/auth/session', params),
  updateProfile: async (data) =>
    await patch('/auth/update', data, {}, 'form-data'),
  changePassword: async (body) => await patch('/v1/auth/change-password', body),
}

export default ProfileService
