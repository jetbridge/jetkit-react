import { apiClient } from './apiClient/index'
import LoginScreen from './LoginScreen'
import {
    authReducer,
    IAuthenticatedApplicationState,
    isAuthenticated,
    storeAccessToken,
    getAccessToken,
    getFreshToken,
    authenticate,
    IUser,
} from './store/auth'

// exporting AuthRedux as a separate entity
// TODO: add more documentation and interfaces
const AuthRedux = {
    authReducer,
    isAuthenticated,
    storeAccessToken,
    getAccessToken,
    getFreshToken,
    authenticate,
}

export { LoginScreen, apiClient, AuthRedux, IAuthenticatedApplicationState, IUser }
