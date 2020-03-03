import { IPaginatedRequest, IPaginatedResponse } from './apiClient/paginated'
import {
  apiClient,
  requestRefresh,
  refreshTokenIfNeeded,
  IAuthResponse,
  setAuthTokensFromAuthResponse,
} from './apiClient/index'
import authService from './service/auth'
import { IUser, IUserCredential } from './store/auth'
import { requestPaginated, FilterableAPICall, PaginatedRequestFunc } from './apiClient/paginated'
import { isLoggedIn, clearAuthTokens, getAccessToken } from 'axios-jwt'
import { UploadFileToS3Args, UploadRequest, UploadRequestClass, PrepareUploadResponse } from './apiClient/asset'

export {
  apiClient,
  IUser,
  IUserCredential,
  authService,
  IPaginatedRequest,
  IPaginatedResponse,
  FilterableAPICall,
  PaginatedRequestFunc,
  requestPaginated,
  // authentication
  IAuthResponse,
  requestRefresh,
  refreshTokenIfNeeded,
  getAccessToken,
  isLoggedIn,
  clearAuthTokens,
  setAuthTokensFromAuthResponse,
  // asset
  UploadFileToS3Args,
  UploadRequest,
  UploadRequestClass,
  PrepareUploadResponse,
}
