import { handleError } from './errorHandler/index'
import { IPaginatedRequest, IPaginatedResponse } from './apiClient/paginated'
import { IMenuSection } from './types'
import { apiClient, requestRefresh, refreshTokenIfNeeded } from './apiClient/index'
import LoginScreen from './LoginScreen'
import Menu from './menu'
import authService from './service/auth'
import { IUser, IUserCredential } from './store/auth'
import snackbarCustom from './snackbarCustom'
import notify from './snackbarCustom/notify'
import useSnackbar, { UseSnackbarUI } from './snackbarCustom/useSnackbar'
import usePagedTable from './table/pagedTable'
import { PagedTable, IPagedTableHook, IPagedTableImpl, IPagedTableProps, PagedDataContext } from './table/pagedTable'
import { requestPaginated, FilterableAPICall } from './apiClient/paginated'
import PrivateRoute from './privateRoute'
import { isLoggedIn, clearAuthTokens, getAccessToken } from 'axios-jwt'
import TextFieldWithDebounce from './TextFieldWithDebounce'

export {
  LoginScreen,
  apiClient,
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
  IPaginatedResponse,
  FilterableAPICall,
  requestPaginated,
  IPagedTableHook,
  IPagedTableImpl,
  IPagedTableProps,
  PagedDataContext,
  requestRefresh,
  PrivateRoute,
  refreshTokenIfNeeded,
  handleError,
  getAccessToken,
  isLoggedIn,
  clearAuthTokens,
  TextFieldWithDebounce,
}
