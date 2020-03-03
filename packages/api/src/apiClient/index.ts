import axios from 'axios'
import { useAuthTokenInterceptor, setAuthTokens } from 'axios-jwt'
import { IAuthTokens, TokenRefreshRequest, refreshTokenIfNeeded as ajwtRefreshTokenIfNeeded } from 'axios-jwt'

// https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
const BASE_URL = process.env.REACT_APP_BASE_URL

export const apiClient = axios.create()
apiClient.defaults.headers.common['Content-Type'] = 'application/json'
apiClient.defaults.baseURL = BASE_URL

// query params serializer for converting params name from ids[] to ids without square brackets
const parseParams = (params: object) => {
  const keys = Object.keys(params)
  let options = ''

  keys.forEach(key => {
    const isParamTypeObject = typeof params[key] === 'object'
    const isParamTypeArray = isParamTypeObject && params[key].length >= 0

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: string) => {
        options += `${key}=${element}&`
      })
    }
  })
  return options ? options.slice(0, -1) : options
}
apiClient.defaults.paramsSerializer = parseParams

// type of response from refresh token endpoint
export interface IAuthResponse {
  access_token: string
  refresh_token: string
}

// refresh token endpoint
const refreshEndpoint = `${BASE_URL}/auth/refresh`

// transform response into IAuthTokens
export const authResponseToAuthTokens = (res: IAuthResponse): IAuthTokens => ({
  accessToken: res.access_token,
  refreshToken: res.refresh_token,
})

/**
 * Process an AuthResponse from auth API and save JWT.
 */
export const setAuthTokensFromAuthResponse = async (res: IAuthResponse) => {
  // transform auth API response
  const tokenRes = authResponseToAuthTokens(res)
  setAuthTokens(tokenRes)
  return tokenRes
}

export const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<string> => {
  // perform refresh
  const res: IAuthResponse = (
    await axios.post(refreshEndpoint, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
  ).data
  return res.access_token
}

// JWT/refresh interceptor
useAuthTokenInterceptor(apiClient, { requestRefresh })

export const refreshTokenIfNeeded = async () => ajwtRefreshTokenIfNeeded(requestRefresh)

export default apiClient
