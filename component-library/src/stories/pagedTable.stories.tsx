import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { PagedTable, usePagedTable, IPaginatedRequest, IPaginatedResponse } from '@jetbridge/frontend-core'
import { TableRow, TableCell } from '@material-ui/core'
import { withPropsTable } from 'storybook-addon-react-docgen'

const total = 100

const fakeAPICall: (req: IPaginatedRequest) => Promise<IPaginatedResponse<IModel[]>> = ({ page, pageSize }) => {
  const rows: IModel[] = []
  for (let i = (page - 1) * pageSize; i < page * pageSize; i++) {
    const model: IModel = {
      id: i + 1,
    }
    rows.push(model)
  }

  return Promise.resolve({
    total,
    total_pages: total / pageSize,
    page_size: pageSize,
    first_page: 1,
    last_page: pageSize,
    page: page,
    rows,
  })
}

interface IModel {
  readonly id: number
}

function renderRow(model: IModel) {
  return (
    <TableRow>
      <TableCell>{model.id}</TableCell>
    </TableRow>
  )
}

function ModelTable() {
  const pagedTable = usePagedTable<IModel>({
    apiCall: fakeAPICall,
  })

  return <PagedTable {...pagedTable.renderProps} renderRow={renderRow} />
}

storiesOf('PagedTable', module)
  .addDecorator(withPropsTable)
  .add('Table', () => {
    return (
      <div style={{ width: 500 }}>
        <ModelTable />
      </div>
    )
  })
