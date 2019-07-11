import * as React from 'react'
import usePagedTable, { PagedTable } from './pagedTable'
import { PaginatedRequestFunc, IPaginatedResponse } from '../apiClient/paginated'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

// import { act } from 'react-dom/test-utils'

import { render, cleanup, waitForElement, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const fakePaginatedResponse = (val: string) => {
  const res: IPaginatedResponse<string[]> = {
    total: 1,
    total_pages: 1,
    first_page: 1,
    last_page: 1,
    page: 1,
    rows: [val],
  }
  return res
}

const tableHeader = (
  <TableHead>
    <TableRow>
      <TableCell>Value</TableCell>
    </TableRow>
  </TableHead>
)

describe('PagedTable', () => {
  afterEach(cleanup)

  it('renders without crashing', async () => {
    const fakeResponse = 'ok'
    const apiCall: PaginatedRequestFunc<string[]> = req => Promise.resolve(fakePaginatedResponse(fakeResponse))

    const Table: React.FC = () => {
      const pagedTable = usePagedTable<string>({
        apiCall,
      })
      const renderRow = React.useCallback(
        (val: string) => (
          <TableRow key={val}>
            <TableCell data-testid="val">Value: {val}</TableCell>
          </TableRow>
        ),
        []
      )
      return <PagedTable {...pagedTable.renderProps} renderRow={renderRow} header={tableHeader} />
    }

    let getByTestId
    // change this to async act when we can upgrade to react 16.9.0
    // https://github.com/facebook/react/pull/14853
    // https://medium.com/@AndreCalvo/testing-custom-react-hooks-that-use-fetch-or-other-async-functions-5fb128d07f53
    act(() => {
      getByTestId = render(<Table />).getByTestId
    })

    await waitForElement(() => getByTestId('val'))

    // should have value from fake paginated response
    expect(getByTestId('val')).toHaveTextContent(fakeResponse)
  })
})
