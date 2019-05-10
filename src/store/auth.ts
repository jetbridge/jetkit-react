import { Dispatch, Reducer } from 'redux'
import { createStandardAction, getType } from 'typesafe-actions'

interface IAction<T> {
    type: string
    payload: T
}

export interface IAuthenticatedApplicationState {
    auth: IUserCredential
}

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
        default: {
            return state
        }
    }
}

export const isAuthenticated = (state: IAuthenticatedApplicationState): boolean => {
    return !!(state.auth.tokens && state.auth.tokens.access_token)
}

export { reducer as authReducer }
