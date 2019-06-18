import * as React from 'react'
import SnackbarCustom, { IMessageType } from '.'

export const SNACKBAR_NOTIF_EVENT = 'JBSnackbarNotify'

interface SnackbarNotificationEvent extends Event {
  detail?: {
    message: string
    messageType: IMessageType
  }
}
interface Options extends Event {
  detail?: {
    message: string
    messageType: IMessageType
  }
}

const useSnackbar = () => {
  const [open, toggleOpen] = React.useState<boolean>(false)
  const [messageType, setType] = React.useState<IMessageType>('info')
  const [message, setMessage] = React.useState<string>('')
  const handleClose = React.useCallback(() => {
    toggleOpen(false)
  }, [])
  const showNotification = React.useCallback((message, messageType) => {
    toggleOpen(true)
    setMessage(message)
    setType(messageType)
  }, [])

  const handleOpenFromEvent = React.useCallback(
    (options: Options) => {
      const message = options.detail && options.detail.message
      if (!message) return
      const messageType = options.detail ? options.detail.messageType : 'default'
      showNotification(message, messageType)
    },
    [showNotification]
  )

  return { open, handleClose, handleOpen: showNotification, message, messageType, handleOpenFromEvent }
}

/**
 * Component to be imported in other projects for showing Material-UI notifications
 * Listens for a CustomEvent of the following format:
 * (JBSnackbarNotify, detail: { message: 'This is an alert', messageType: 'success'})
 */
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
