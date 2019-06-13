import apiClient, { authResponseToAuthTokens } from '../apiClient'
import { IUserCredential } from '../store/auth'
import { setAuthTokens } from 'axios-jwt'

export default {
  login: async (email: string, password: string): Promise<IUserCredential> => {
    const res = (await apiClient.post('/auth/login', { email, password })).data
    setAuthTokens(authResponseToAuthTokens(res))
    return res
  },
}
