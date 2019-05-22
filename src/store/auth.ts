import { Dispatch, Reducer } from 'redux'
import { createStandardAction, getType } from 'typesafe-actions'
import { login, refreshToken, IRefreshTokenResponse } from '../apiClient/auth'

export interface IAction<T> {
    type: string
    payload: T
}

export interface IAuthenticatedApplicationState {
    auth: IUserCredential
}

export type GetState = () => IAuthenticatedApplicationState
export interface ICredentials {
    readonly refresh_token: string
    readonly access_token: string
}

export type IUserType = 'client' | 'stuff'

export interface IUser {
    readonly id?: number
    readonly name?: string
    readonly email?: string
    readonly user_type?: IUserType
}

export interface IUserCredential {
    readonly tokens?: ICredentials
    readonly user?: IUser
}

export const initialState: IUserCredential = {}

export const storeAccessToken = createStandardAction('auth/storeAccessToken')<string>()
export const storeCredentials = createStandardAction('auth/storeCreds')<IUserCredential>()

const reducer: Reducer<IUserCredential> = (state = initialState, action) => {
    switch (action.type) {
        case getType(storeAccessToken): {
            if (!state.tokens || !state.tokens.refresh_token) {
                console.error('got storeAccessToken but we are missing refresh token. cannot continue.')
                return state
            }
            return {
                ...state,
                tokens: {
                    ...state.tokens,
                    access_token: action.payload,
                },
            }
        }
        case getType(storeCredentials): {
            return {
                ...state,
                tokens: {
                    access_token: action.payload.access_token,
                    refresh_token: action.payload.refreshToken,
                },
                user: {
                    name: action.payload.user.name,
                },
            }
        }
        default: {
            return state
        }
    }
}

export type authState = ReturnType<typeof reducer>

export function authenticate(email: string, password: string) {
    return async (dispatch: Dispatch, getState: GetState) => {
        const credentials = await login(email, password)
        return dispatch(storeCredentials(credentials))
    }
}

export function getFreshToken() {
    return async (dispatch: Dispatch, getState: GetState): Promise<ICredentials | IRefreshTokenResponse> => {
        const creds = credentialsSelector(getState())
        const token = creds ? creds.refresh_token : null
        if (!token) return Promise.reject('No refresh token')

        // refresh
        return await refreshToken(token)
    }
}

export const credentialsSelector = (state: IAuthenticatedApplicationState): ICredentials | undefined => {
    return state.auth.tokens
}

export const getAccessToken = () => (dispatch: Dispatch, getState: GetState) => {
    const creds = credentialsSelector(getState())
    return creds ? creds.access_token : null
}

export const isAuthenticated = (state: IAuthenticatedApplicationState): boolean => {
    return !!(state.auth.tokens && state.auth.tokens.access_token)
}

export { reducer as authReducer }
