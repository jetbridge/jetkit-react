import { IPaginatedRequest } from './apiClient/paginated';
import { IMenuSection } from './types'
import { apiClient } from './apiClient/index'
import LoginScreen from './LoginScreen'
import Menu from './menu'
import authService from './service/auth'
import { authReducer, IAuthenticatedApplicationState, authenticate, IUser, IUserCredential } from './store/auth'
import snackbarCustom from './snackbarCustom'
import notify from './snackbarCustom/notify'
import useSnackbar, { UseSnackbarUI } from './snackbarCustom/useSnackbar'
import usePagedTable from './table/pagedTable';
import { PagedTable } from './table/pagedTable';

// exporting AuthRedux as a separate entity
// TODO: add more documentation and interfaces
const AuthRedux = {
  authReducer,
  authenticate,
  apiClient,
}

export {
  LoginScreen,
  apiClient,
  AuthRedux,
  IAuthenticatedApplicationState,
  IUser,
  IUserCredential,
  Menu,
  IMenuSection,
  authService,
  snackbarCustom,
  useSnackbar,
  notify,
  UseSnackbarUI,
  usePagedTable,
  PagedTable,
  IPaginatedRequest,
}
