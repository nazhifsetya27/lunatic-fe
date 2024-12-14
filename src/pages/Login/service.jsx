import { post } from '../../services/NetworkUtils'

export const LoginService = {
  login: async (data) => await post('/auth/', data),
}
