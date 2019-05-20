import apiClient, { tokenStorage } from '.'
import { IUserCredential } from '../store/auth'

export const refreshToken = async (refresh_token: string) => {
    try {
        const res = await apiClient.post('/auth/refresh', { refresh_token })
        return res.data
    } catch (err) {
        // failed to refresh... check error type
        if (err && err.response && err.response.status === 401) {
            // got invalid token response for sure, log user out
            tokenStorage.reset()
            return Promise.reject('Got 401 on token refresh; Resetting auth token' + err)
        } else {
            return Promise.reject('Failed to refresh auth token: ' + err)
        }
    }
}

export const login = async (email: string, password: string): Promise<IUserCredential> => {
    const res = await apiClient.post('/auth/login', { email, password })
    return res.data
}

export const devValidAuth = () => {
    return apiClient.get('/foo')
}
