import { handleError } from './errorHandler/index'
import { IPaginatedRequest, IPaginatedResponse } from './apiClient/paginated'
import { IMenuSection } from './types'
import {
  apiClient,
  requestRefresh,
  refreshTokenIfNeeded,
  IAuthResponse,
  setAuthTokensFromAuthResponse,
} from './apiClient/index'
import LoginScreen from './LoginScreen'
import Menu from './menu'
import authService from './service/auth'
import { IUser, IUserCredential } from './store/auth'
import snackbarCustom from './snackbarCustom'
import notify from './snackbarCustom/notify'
import useSnackbar, { UseSnackbarUI } from './snackbarCustom/useSnackbar'
import usePagedTable from './table/pagedTable/pagedTable'
import { PagedTable, IPagedTableHook, IPagedTableProps, PagedDataContext } from './table/pagedTable/pagedTable'
import { IPagedTableImpl } from './table/pagedTable/models'
import { useSmoothPagedTable, SmoothPagedTable } from './table/pagedTable/smoothPagedTable'
import { requestPaginated, FilterableAPICall } from './apiClient/paginated'
import PrivateRoute from './privateRoute'
import { isLoggedIn, clearAuthTokens, getAccessToken } from 'axios-jwt'
import TextFieldWithDebounce from './form/textFieldWithDebounce'
import { UploadFileToS3Args, UploadRequest, UploadRequestClass, PrepareUploadResponse } from './apiClient/asset'
import AssetUpload, { IAssetUpload } from './form/assetUpload'
import FileDropzone, { IFileDropzoneProps } from './form/fileDropzone'
import { useDropzone } from './form/fileDropzone/useFileDropzone'
import toTitleCase from './toTitleCase'
import { useEventual } from './useEventual/index'
import DragDropArea from './form/dragDropArea'

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
  TextFieldWithDebounce,
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
  toTitleCase,
  // authentication
  IAuthResponse,
  requestRefresh,
  PrivateRoute,
  refreshTokenIfNeeded,
  handleError,
  getAccessToken,
  isLoggedIn,
  clearAuthTokens,
  setAuthTokensFromAuthResponse,
  // asset
  UploadFileToS3Args,
  UploadRequest,
  UploadRequestClass,
  PrepareUploadResponse,
  AssetUpload,
  IAssetUpload,
  FileDropzone,
  IFileDropzoneProps,
  useDropzone,
  SmoothPagedTable,
  useSmoothPagedTable,
  useEventual,
  DragDropArea,
}
