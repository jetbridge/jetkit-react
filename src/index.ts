import { apiClient } from './apiClient/index'
import LoginScreen from './LoginScreen'
import { authReducer, IAuthenticatedApplicationState, authenticate, IUser, IUserCredential } from './store/auth'
import authService from './service/auth'

// exporting AuthRedux as a separate entity
// TODO: add more documentation and interfaces
const AuthRedux = {
  authReducer,
  authenticate,
}

export { LoginScreen, apiClient, AuthRedux, IAuthenticatedApplicationState, IUser, IUserCredential, authService }
