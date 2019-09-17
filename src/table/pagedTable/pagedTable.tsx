import * as React from 'react'
import Table from '@material-ui/core/Table'
import TablePagination from '@material-ui/core/TablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import EmptyTableRow from '../emptyTableRow'
import { AxiosError } from 'axios'
import {
  IPagedTableImpl,
  IPagedDataContext,
  IPagedTablePaging,
  IPagedTableBaseProps,
  IUsePagedTableProps,
} from './models'

// hook args

interface IDefaultPagedTableImpl<T> extends IPagedTableImpl<T>, IPagedTablePaging {}

// the table element
export interface IPagedTableProps<T> extends IDefaultPagedTableImpl<T>, IPagedTableBaseProps<T> {
  footer?: React.ReactNode
}

// hook return value
// pass renderProps like: <PagedTable {...pagedTable.renderProps} />
export interface IPagedTableHook<T> {
  reloadData: () => void
  isLoading: boolean
  renderProps: IDefaultPagedTableImpl<T>
  totalRows: number
  page: number // 0-indexed
}

// context for our data table
// can be used by nested components to for a reload of the data, for instance when editing/deleting rows

export const PagedDataContext = React.createContext<IPagedDataContext>({ reloadData: () => {} })

export function PagedTable<T>({
  header,
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
  footer,
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
            {footer ? (
              footer
            ) : (
              <TablePagination
                rowsPerPageOptions={[15, 25, 50]}
                colSpan={columnsSpan}
                count={totalRows}
                rowsPerPage={pageSize}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </PagedDataContext.Provider>
  )
}

// do a deep equality check before actually mutating rows
// const setRowsIfChanged = <T>(resRows: T[], rows: T[], setRows: (r T[]) :void) => {
//     if (!_.isEqual(resRows, rows)) setRows(resRows)
//   }

function usePagedTable<T>(props: IUsePagedTableProps<T>): IPagedTableHook<T> {
  const { apiCall, queryParams, autoLoad = true, defaultPageSize = 25 } = props

  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(defaultPageSize)
  const [error, setError] = React.useState<AxiosError>()
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
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [apiCall, page, pageSize, queryParams, setIsLoading, setError])

  // load on component mount
  React.useEffect(() => {
    if (autoLoad && !error) loadAPI()
  }, [loadAPI, autoLoad, error])

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
