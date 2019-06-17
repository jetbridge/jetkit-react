import * as React from 'react'
import { Button, Icon, Snackbar, SnackbarContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'

const useStyles = makeStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: '#ee625d',
  },
  info: {
    backgroundColor: '#4080ee',
  },
  warning: {
    backgroundColor: amber[700],
  },
  default: {
    backgroundColor: '#959595',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

interface ISnackbar {
  open: boolean
  handleClose: () => void
  handleOpen: (message: string, warning?: boolean) => void
  message: string
  type: string
}

const CustomSnackbarContent = (props: ISnackbar) => {
  const { handleClose, message, type } = props
  const classes = useStyles()
  const getType = React.useCallback(
    type => {
      switch (type) {
        case 'success':
          return classes.success
        case 'warning':
          return classes.warning
        case 'info':
          return classes.info
        case 'error':
          return classes.error
        default:
          return classes.default
      }
    },
    [classes]
  )
  return (
    <SnackbarContent
      key={message}
      className={getType(type)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      }
      action={[
        <Icon key="close" onClick={handleClose}>
          close
        </Icon>,
      ]}
    />
  )
}

const SnackbarCustom = (props: ISnackbar) => {
  const { open, handleClose } = props
  return (
    <Snackbar
      key={props.message}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      action={[
        <div key="undo">
          ,
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          ,<Icon onClick={handleClose}>close</Icon>,
        </div>,
      ]}
    >
      <CustomSnackbarContent {...props} />
    </Snackbar>
  )
}
export default SnackbarCustom
