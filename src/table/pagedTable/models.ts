import { IPaginatedRequest, IPaginatedResponse } from '../../apiClient/paginated'

export interface IPagedDataContext {
  reloadData: (onPage?: number) => void
}

export interface IPagedTableBaseProps<T> {
  paperClassName?: string
  tableClassName?: string
  tableBodyClassName?: string
  renderRow: (data: T) => React.ReactNode
  header?: React.ReactElement
  emptyRowText?: string
  emptyRowComponent?: React.ReactElement
}
export interface IUsePagedTableProps<T> {
  queryParams?: object
  apiCall: (req: IPaginatedRequest) => Promise<IPaginatedResponse<T[]>>
  autoLoad?: boolean
  defaultPageSize?: number
}

// data passed from hook to component
export interface IPagedTableImpl<T> {
  rows: T[]
  pagedDataContext: IPagedDataContext
  colSpan?: number
}

export interface IPagedTablePaging {
  totalRows: number
  pageSize: number
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}
