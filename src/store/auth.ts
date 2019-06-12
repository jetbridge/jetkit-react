import { Dispatch, Reducer } from 'redux'
import { createStandardAction, getType } from 'typesafe-actions'
import authService from '../service/auth'

export interface IAction<T> {
  type: string
  payload: T
}

export interface IAuthenticatedApplicationState {
  auth: IUserCredential
}

export type GetState = () => IAuthenticatedApplicationState

export type IUserType = 'client' | 'staff'

export interface IUser {
  readonly id?: number
  readonly name?: string
  readonly email?: string
  readonly user_type?: IUserType
}

export interface IUserCredential {
  readonly user?: IUser
}

export const initialState: IUserCredential = {}

export const storeAuthResponse = createStandardAction('auth/storeCreds')<IUserCredential>()

const reducer: Reducer<IUserCredential> = (state = initialState, action) => {
  switch (action.type) {
    case getType(storeAuthResponse): {
      return {
        ...state,
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
    const res = await authService.login(email, password)
    return dispatch(storeAuthResponse(res))
  }
}

export { reducer as authReducer }
