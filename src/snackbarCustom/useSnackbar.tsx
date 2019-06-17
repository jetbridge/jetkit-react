import * as React from 'react'
import SnackbarCustom from '.'

export const SNACKBAR_NOTIF_EVENT = 'JBSnackbarNotify'

interface SnackbarNotificationEvent extends Event {
  detail?: {
    message: string
    type: string
  }
}
interface Options extends Event {
  detail?: {
    message: string
    type: string
  }
}

const useSnackbar = () => {
  const [open, toggleOpen] = React.useState<boolean>(false)
  const [type, setType] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const handleClose = React.useCallback(() => {
    toggleOpen(false)
  }, [])
  const handleOpen = React.useCallback((message, type) => {
    toggleOpen(true)
    setMessage(message)
    setType(type)
  }, [])

  const handleOpenFromEvent = React.useCallback(
    (options: Options) => {
      const message = options.detail ? options.detail.message : ''
      const type = options.detail ? options.detail.type : 'default'
      handleOpen(message, type)
    },
    [handleOpen]
  )

  return { open, handleClose, handleOpen, message, type, handleOpenFromEvent }
}

export const UseSnackbarUI = () => {
  const snackbar = useSnackbar()

  const snackbarNotifListener = React.useCallback(
    (e: SnackbarNotificationEvent) => {
      snackbar.handleOpenFromEvent(e)
    },
    [snackbar]
  )

  React.useEffect(() => {
    document.addEventListener(SNACKBAR_NOTIF_EVENT, snackbarNotifListener)

    return () => {
      document.removeEventListener(SNACKBAR_NOTIF_EVENT, snackbarNotifListener)
    }
  })

  return <SnackbarCustom {...snackbar} />
}

export default useSnackbar
