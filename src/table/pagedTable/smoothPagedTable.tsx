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

          <TableBody data-testid="paged-body">
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
  const [lastPage, setLastPage] = React.useState<number>()
  const [pageSize, setPageSize] = React.useState(defaultPageSize)
  const [error, setError] = React.useState<AxiosError>()
  const [rows, setRows] = React.useState<{ [page: number]: T[] }>({ 0: [] })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // load data
  const loadAPI = React.useCallback(async (pageNumber?: number) => {
    // fetch data from paginated API
    try {
      const pageToLoad = pageNumber || page
      // used to refresh the current page to show the new values
      if (lastPage && page + 1 > lastPage) return
      setIsLoading(true)
      // TablePagination is zero-indexed, API is not
      const res = await apiCall({ page: pageToLoad + 1, pageSize, queryParams: queryParams })
      setRows(prev => ({
        ...prev,
        [pageToLoad]: res.rows,
      }))
      setLastPage(res.last_page)
      // if pageNumber is provided, we are refreshing this page, so the current page
      // has to be set to the page that we are refreshing
      if (pageNumber) setPage(pageNumber)
      // set newPage as current page
      // someone maybe scrolling like crazy so let's always remember last page
      else if (res.page) setPage(prevPage => Math.max(prevPage, res.page))
      else setPage(0)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [setLastPage, lastPage, apiCall, page, pageSize, queryParams, setIsLoading, setError])

  const reloadFirstPage = React.useCallback(async() => {
    loadAPI(0)
  }, [setLastPage, apiCall, setIsLoading, setRows, setPage])

  // load on component mount
  React.useEffect(() => {
    if (autoLoad && !error) loadAPI()
  }, [autoLoad])

  // pagination controls callback
  const handleDidScrollToEnd = React.useCallback(() => {
    loadAPI()
  }, [loadAPI])

  // our PagedDataContext
  const pagedDataContext = React.useMemo(() => ({ reloadData: loadAPI }), [loadAPI])

  // does useMemo help here at all?
  return React.useMemo(
    () => ({
      isLoading,
      reloadData: loadAPI,
      reloadFirstPage,
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
    [isLoading, loadAPI, reloadFirstPage, rows, page, setPage, pageSize, setPageSize, handleDidScrollToEnd, pagedDataContext]
  )
}
