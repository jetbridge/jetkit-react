import * as React from 'react'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import { TableRow, TableBody } from '@material-ui/core'
import EmptyTableRow from './emptyTableRow'
import { IPaginatedRequest, IPaginatedResponse } from '../apiClient/paginated'

// hook args
export interface IUsePagedTableProps<T> {
  queryParams?: object
  apiCall: (req: IPaginatedRequest) => Promise<IPaginatedResponse<T[]>>
  autoLoad?: boolean
}

// data passed from hook to component
interface IPagedTableImpl<T> {
  rows: T[]
  pagedDataContext: IPagedDataContext
  totalRows: number
  pageSize: number
  page: number
  colSpan?: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// the table element
export interface IPagedTableProps<T> extends IPagedTableImpl<T> {
  paperClassName?: string
  tableClassName?: string
  renderRow: (data: T) => React.ReactNode
  header?: React.ReactElement
  emptyRowText?: string
}

// hook return value
// pass renderProps like: <PagedTable {...pagedTable.renderProps} />
export interface IPagedTableHook<T> {
  reloadData: () => void
  isLoading: boolean
  renderProps: IPagedTableImpl<T>
  totalRows: number
  page: number // 0-indexed
}

// context for our data table
// can be used by nested components to for a reload of the data, for instance when editing/deleting rows
export interface IPagedDataContext {
  reloadData: () => void
}
export const PagedDataContext = React.createContext<IPagedDataContext>({ reloadData: () => {} })

export function PagedTable<T>({
  header,
  paperClassName,
  tableClassName,
  renderRow,
  emptyRowText,
  rows,
  pagedDataContext,
  totalRows,
  pageSize,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  colSpan,
}: IPagedTableProps<T>) {
  // render rows
  const rowsToDisplay = React.useMemo(() => rows.map(data => renderRow(data)), [rows, renderRow])

  // if colSpan is not specified - try to figure it out from the header
  let columnsSpan: number = colSpan || 0
  if (!columnsSpan && header && header.props && header.props.children) {
    // <TableHead> <TableRow> <TableCell>...</TableCell> <TableCell>...</TableCell> ...
    const headerChild = React.Children.only(header.props.children) // TableRow
    columnsSpan = React.Children.count(headerChild.props.children) || 1 // TableCells count
  } else if (!columnsSpan) {
    columnsSpan = 1
  }

  return (
    <PagedDataContext.Provider value={pagedDataContext}>
      <Paper elevation={2} className={paperClassName}>
        <Table className={tableClassName}>
          {header ? header : null}
          <TableBody data-testid="paged-body">
            {rowsToDisplay && rowsToDisplay.length ? (
              rowsToDisplay
            ) : (
              <EmptyTableRow colSpan={columnsSpan} rowText={emptyRowText} />
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[15, 25, 50]}
                colSpan={columnsSpan}
                count={totalRows}
                rowsPerPage={pageSize}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </PagedDataContext.Provider>
  )
}
// do a deep equality check before actually mutating rows
// const setRowsIfChanged = <T>(resRows: T[], rows: T[], setRows: (r T[]) :void) => {
//     if (!_.isEqual(resRows, rows)) setRows(resRows)
//   }

function usePagedTable<T>(props: IUsePagedTableProps<T>): IPagedTableHook<T> {
  const { apiCall, queryParams, autoLoad = true } = props

  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)
  const [rows, setRows] = React.useState<T[]>([])
  const [totalRows, setTotalRows] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // load data
  const loadAPI = React.useCallback(async () => {
    // fetch data from paginated API
    try {
      setIsLoading(true)
      const res = await apiCall({ page: page + 1, pageSize, queryParams: queryParams })

      setRows(res.rows)
      setTotalRows(res.total)

      // TablePagination is zero-indexed, API is not
      if (res.page) setPage(res.page - 1)
      else setPage(0)
    } finally {
      setIsLoading(false)
    }
  }, [apiCall, page, pageSize, queryParams, setIsLoading])

  // load on component mount
  React.useEffect(() => {
    if (autoLoad) loadAPI()
  }, [loadAPI, autoLoad])

  // pagination controls callback
  const handleChangePage = React.useCallback((event: unknown, newPage: number) => setPage(newPage), [])
  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setPageSize(+event.target.value),
    []
  )

  // our PagedDataContext
  const pagedDataContext = React.useMemo(() => ({ reloadData: loadAPI }), [loadAPI])

  // does useMemo help here at all?
  return React.useMemo(
    () => ({
      isLoading,
      reloadData: loadAPI,
      totalRows,
      page,
      renderProps: {
        rows,
        page,
        setPage,
        pageSize,
        setPageSize,
        totalRows,
        isLoading,
        handleChangePage,
        pagedDataContext,
        handleChangeRowsPerPage,
        setTotalRows,
      },
    }),
    [
      isLoading,
      loadAPI,
      rows,
      page,
      setPage,
      pageSize,
      setPageSize,
      totalRows,
      handleChangePage,
      pagedDataContext,
      handleChangeRowsPerPage,
      setTotalRows,
    ]
  )
}

export default usePagedTable
