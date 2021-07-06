import { handleError } from './errorHandler/index'
import {
  IPaginatedRequest as ImportedIPaginatedRequest,
  IPaginatedResponse as ImportedIPaginatedResponse,
} from './apiClient/paginated'
import { IMenuSection as ImportedIMenuSection } from './types'
import {
  apiClient,
  requestRefresh,
  refreshTokenIfNeeded,
  IAuthResponse as ImportedIAuthResponse,
  setAuthTokensFromAuthResponse,
} from './apiClient/index'
import LoginScreen from './LoginScreen'
import Menu from './menu'
import authService from './service/auth'
import { IUser as ImportedIUser, IUserCredential as ImportedIUserCredential } from './store/auth'
import snackbarCustom from './snackbarCustom'
import notify from './snackbarCustom/notify'
import useSnackbar, { UseSnackbarUI } from './snackbarCustom/useSnackbar'
import usePagedTable from './table/pagedTable/pagedTable'
import {
  PagedTable,
  IPagedTableHook as ImportedIPagedTableHook,
  IPagedTableProps as ImportedIPagedTableProps,
  PagedDataContext,
} from './table/pagedTable/pagedTable'
import { IPagedTableImpl as ImportedIPagedTableImpl } from './table/pagedTable/models'
import { useSmoothPagedTable, SmoothPagedTable } from './table/pagedTable/smoothPagedTable'
import { requestPaginated, FilterableAPICall as ImportedFilterableAPICall } from './apiClient/paginated'
import PrivateRoute from './privateRoute'
import { isLoggedIn, clearAuthTokens, getAccessToken } from 'axios-jwt'
import TextFieldWithDebounce from './form/textFieldWithDebounce'
import {
  UploadFileToS3Args as ImportedUploadFileToS3Args,
  UploadRequest,
  UploadRequestClass as ImportedUploadRequestClass,
  PrepareUploadResponse as ImportedPrepareUploadResponse,
} from './apiClient/asset'
import AssetUpload, { IAssetUpload as ImportedIAssetUpload } from './form/assetUpload'
import FileDropzone, { IFileDropzoneProps as ImportedIFileDropzoneProps } from './form/fileDropzone'
import { useDropzone } from './form/fileDropzone/useFileDropzone'
import toTitleCase from './toTitleCase'
import { useEventual } from './useEventual/index'
import DragDropArea from './form/dragDropArea'

export type IUser = ImportedIUser
export type IUserCredential = ImportedIUserCredential
export type IMenuSection = ImportedIMenuSection
export type IPaginatedRequest = ImportedIPaginatedRequest
export type IPaginatedResponse<T> = ImportedIPaginatedResponse<T>
export type FilterableAPICall<T> = ImportedFilterableAPICall<T>
export type IPagedTableHook<T> = ImportedIPagedTableHook<T>
export type IPagedTableImpl<T> = ImportedIPagedTableImpl<T>
export type IPagedTableProps<T> = ImportedIPagedTableProps<T>
// authentication
export type IAuthResponse = ImportedIAuthResponse
// asset
export type UploadFileToS3Args = ImportedUploadFileToS3Args
export type UploadRequestClass = ImportedUploadRequestClass
export type PrepareUploadResponse = ImportedPrepareUploadResponse
export type IAssetUpload = ImportedIAssetUpload
export type IFileDropzoneProps = ImportedIFileDropzoneProps

export {
  LoginScreen,
  apiClient,
  Menu,
  authService,
  snackbarCustom,
  useSnackbar,
  notify,
  UseSnackbarUI,
  TextFieldWithDebounce,
  usePagedTable,
  PagedTable,
  requestPaginated,
  PagedDataContext,
  toTitleCase,
  requestRefresh,
  PrivateRoute,
  refreshTokenIfNeeded,
  handleError,
  getAccessToken,
  isLoggedIn,
  clearAuthTokens,
  setAuthTokensFromAuthResponse,
  UploadRequest,
  AssetUpload,
  FileDropzone,
  useDropzone,
  SmoothPagedTable,
  useSmoothPagedTable,
  useEventual,
  DragDropArea,
}
