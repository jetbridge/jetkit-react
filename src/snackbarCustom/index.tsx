import * as React from 'react'
// import { Button, Icon, Snackbar, SnackbarContent } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/styles'
import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'
import classNames from 'classnames'

const useStyles = makeStyles({
  base: {
    display:'flex',
    flexDirection: 'row'
  },
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

export type IMessageType = 'success' | 'warning' | 'info' | 'error'

interface ISnackbar {
  open: boolean
  handleClose: () => void
  handleOpen: (message: string, warning?: boolean) => void
  message: string
  messageType: IMessageType
}

const CustomSnackbarContent = (props: ISnackbar) => {
  const { handleClose, message, messageType } = props
  const classes = useStyles()
  const getType = React.useCallback(
    messageType => {
      switch (messageType) {
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
      className={classNames(getType(messageType), classes.base)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      }
      action={[
        <CloseIcon key="close" onClick={handleClose}>
          close
        </CloseIcon>,
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
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={props.messageType === 'error' ? undefined : 4000}
      onClose={handleClose}
      action={[
        <div key="undo">
          ,
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          ,<CloseIcon onClick={handleClose}>close</CloseIcon>,
        </div>,
      ]}
    >
      <CustomSnackbarContent {...props}/>
    </Snackbar>
  )
}
export default SnackbarCustom
