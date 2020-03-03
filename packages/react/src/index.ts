import { handleError } from './errorHandler/index'
import { IMenuSection } from './types'
import LoginScreen from './LoginScreen'
import Menu from './menu'
import snackbarCustom from './snackbarCustom'
import notify from './snackbarCustom/notify'
import useSnackbar, { UseSnackbarUI } from './snackbarCustom/useSnackbar'
import usePagedTable from './table/pagedTable/pagedTable'
import { PagedTable, IPagedTableHook, IPagedTableProps, PagedDataContext } from './table/pagedTable/pagedTable'
import { IPagedTableImpl } from './table/pagedTable/models'
import { useSmoothPagedTable, SmoothPagedTable } from './table/pagedTable/smoothPagedTable'
import PrivateRoute from './privateRoute'
import { isLoggedIn, clearAuthTokens, getAccessToken } from 'axios-jwt'
import TextFieldWithDebounce from './form/textFieldWithDebounce'
import AssetUpload, { IAssetUpload } from './form/assetUpload'
import FileDropzone, { IFileDropzoneProps } from './form/fileDropzone'
import { useDropzone } from './form/fileDropzone/useFileDropzone'
import toTitleCase from './toTitleCase'

export {
  LoginScreen,
  Menu,
  IMenuSection,
  snackbarCustom,
  useSnackbar,
  notify,
  UseSnackbarUI,
  TextFieldWithDebounce,
  usePagedTable,
  PagedTable,
  IPagedTableHook,
  IPagedTableImpl,
  IPagedTableProps,
  PagedDataContext,
  toTitleCase,
  // authentication
  PrivateRoute,
  handleError,
  getAccessToken,
  isLoggedIn,
  clearAuthTokens,
  // asset
  AssetUpload,
  IAssetUpload,
  FileDropzone,
  IFileDropzoneProps,
  useDropzone,
  SmoothPagedTable,
  useSmoothPagedTable,
}
