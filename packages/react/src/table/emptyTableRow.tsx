import Typography from '@material-ui/core/Typography'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import * as React from 'react'

const styles = () =>
  createStyles({
    cell: {
      padding: '1rem',
    },
  })

interface IEmptyTableRowProps extends WithStyles<typeof styles> {
  rowText?: string // text to display
  colSpan: number // number of columns to span, i.e. table width in columns
  rowHeight?: string // row height
  fontSize?: string // font size for the text in this row
}

const EmptyTableRow: React.FunctionComponent<IEmptyTableRowProps> = ({
  classes,
  rowText = 'No Data',
  colSpan,
  rowHeight,
  fontSize,
}) => (
  <TableRow style={{ height: rowHeight }}>
    <TableCell className={classes.cell} colSpan={colSpan} align="center">
      <Typography style={{ fontSize: fontSize || '1rem' }}>{rowText}</Typography>
    </TableCell>
  </TableRow>
)

export default withStyles(styles)(EmptyTableRow)
