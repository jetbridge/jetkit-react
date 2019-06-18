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
  const handleOpen = React.useCallback((message, messageType) => {
    toggleOpen(true)
    setMessage(message)
    setType(messageType)
  }, [])

  const handleOpenFromEvent = React.useCallback(
    (options: Options) => {
      const message = options.detail ? options.detail.message : ''
      const messageType = options.detail ? options.detail.messageType : 'default'
      handleOpen(message, messageType)
    },
    [handleOpen]
  )

  return { open, handleClose, handleOpen, message, messageType, handleOpenFromEvent }
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
