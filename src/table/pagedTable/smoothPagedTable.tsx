import * as React from 'react'
import classNames from 'classnames'
import { AxiosError } from 'axios'
import { makeStyles } from '@material-ui/styles'
import { IPagedTableImpl, IPagedTableBaseProps, IUsePagedTableProps } from './models'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import { PagedDataContext } from '../..'
import EmptyTableRow from '../emptyTableRow'

const useSmoothTableStyles = makeStyles({
  smoothTableRoot: {
    height: 500,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
})

export interface ISmoothPagedTableProps<T> extends IPagedTableImpl<T>, IPagedTableBaseProps<T> {
  handleDidScrollToEnd: () => void
  rootClassName?: string
  isLoading?: boolean
}

export function SmoothPagedTable<T>({
  header,
  tableClassName,
  rootClassName,
  renderRow,
  emptyRowText,
  rows,
  pagedDataContext,
  handleDidScrollToEnd,
  colSpan,
  isLoading,
}: ISmoothPagedTableProps<T>) {
  const classes = useSmoothTableStyles()
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

  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const element: any = event.target
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        handleDidScrollToEnd()
      }
    },
    [handleDidScrollToEnd]
  )

  return (
    <PagedDataContext.Provider value={pagedDataContext}>
      <div onScroll={handleScroll} className={classNames(rootClassName, classes.smoothTableRoot)}>
        <Table className={tableClassName}>
          {header ? header : null}

          <TableBody key={'table_body'} data-testid="paged-body">
            {rowsToDisplay && rowsToDisplay.length ? (
              rowsToDisplay
            ) : (
              <EmptyTableRow colSpan={columnsSpan} rowText={emptyRowText} />
            )}
            {isLoading && <EmptyTableRow colSpan={columnsSpan} rowText={'Loading'} />}
          </TableBody>
        </Table>
      </div>
    </PagedDataContext.Provider>
  )
}

export function useSmoothPagedTable<T>(props: IUsePagedTableProps<T>) {
  const { apiCall, queryParams, autoLoad = true, defaultPageSize = 25 } = props

  const [page, setPage] = React.useState(0)
  const [lastPage, setLastPage] = React.useState(5000)
  const [pageSize, setPageSize] = React.useState(defaultPageSize)
  const [error, setError] = React.useState<AxiosError>()
  const [rows, setRows] = React.useState<{ [page: number]: T[] }>({ 0: [] })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // load data
  const loadAPI = React.useCallback(async () => {
    // fetch data from paginated API
    try {
      if (page + 1 > lastPage) return
      setIsLoading(true)
      const res = await apiCall({ page: page + 1, pageSize, queryParams: queryParams })

      setRows(prev => ({
        ...prev,
        [page]: res.rows,
      }))
      setLastPage(res.last_page)

      // TablePagination is zero-indexed, API is not
      if (res.page) setPage(prevPage => Math.max(prevPage, res.page - 1))
      else setPage(0)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [setLastPage, lastPage, apiCall, page, pageSize, queryParams, setIsLoading, setError])

  // load on component mount
  React.useEffect(() => {
    if (autoLoad && !error) loadAPI()
  }, [loadAPI, autoLoad, error])

  // pagination controls callback
  const handleDidScrollToEnd = React.useCallback(() => {
    setPage(prevPage => prevPage + 1)
  }, [setPage])

  // our PagedDataContext
  const pagedDataContext = React.useMemo(() => ({ reloadData: loadAPI }), [loadAPI])

  // does useMemo help here at all?
  return React.useMemo(
    () => ({
      isLoading,
      reloadData: loadAPI,
      page,
      renderProps: {
        rows: Object.values(rows).reduce((acc, val) => acc.concat(val), []),
        page,
        setPage,
        pageSize,
        setPageSize,
        isLoading,
        handleDidScrollToEnd,
        pagedDataContext,
      },
    }),
    [isLoading, loadAPI, rows, page, setPage, pageSize, setPageSize, handleDidScrollToEnd, pagedDataContext]
  )
}
