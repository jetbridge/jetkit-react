import axios from 'axios'
import * as tokenProvider from 'axios-token-interceptor'
import * as jwt from 'jsonwebtoken'
import { storeAccessToken, getAccessToken, getFreshToken, authState } from '../store/auth'

// https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
const BASE_URL = process.env.REACT_APP_BASE_URL

export const apiClient = axios.create()
apiClient.defaults.headers.common['Content-Type'] = 'application/json'
apiClient.defaults.baseURL = BASE_URL

interface IStore extends authState {
    dispatch: Function
}

interface TokenCache {
    reset(): void
}

class TokenStorage {
    private store?: IStore
    private cache?: TokenCache

    public setStore(store: IStore) {
        this.store = store
    }

    public getCache() {
        return this.cache
    }

    public getToken = async () => {
        console.log('get token')
        const accessToken = this.store && this.store.dispatch(getAccessToken())
        if (this.isTokenExpired(accessToken)) {
            // if token expired
            const newToken = await this.refreshToken() // ask for new access token
            if (!newToken) return

            this.cache && this.cache.reset() // reset cache (just in cache)
            // store access token
            this.store && this.store.dispatch(storeAccessToken(newToken))

            return newToken
        } else {
            return accessToken
        }
    }

    private isTokenExpired = (token: string) => {
        const expin = this.getExpiresInFromJWT(token)
        return !expin || expin < 0
    }

    // gets unix TS
    private getTokenExpiresTimeStamp = (token: string) => {
        const decoded = jwt.decode(token)
        return decoded && decoded['exp'] - 20
    }

    private getExpiresInFromJWT = (token: string): number => {
        const exp = this.getTokenExpiresTimeStamp(token)
        if (exp) return exp - Date.now() / 1000

        return -1
    }

    private refreshToken = async (): Promise<string> => {
        try {
            if (!this.store) return ''
            const tokens = (await this.store) && this.store.dispatch(getFreshToken())
            return tokens ? tokens.access_token : ''
        } catch (err) {
            return ''
        }
    }

    public reset = () => {
        this.cache && this.cache.reset()
    }
}
export const tokenStorage = new TokenStorage()

export default apiClient
