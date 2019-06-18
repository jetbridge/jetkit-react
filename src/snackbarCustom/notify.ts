import { SNACKBAR_NOTIF_EVENT } from './useSnackbar'

const notify = {
  success: (message: string = 'Success') => {
    const notifyEvent = new CustomEvent(SNACKBAR_NOTIF_EVENT, { detail: { message, messageType: 'success' } })
    document.dispatchEvent(notifyEvent)
  },
  warning: (message: string = 'Error') => {
    const notifyEvent = new CustomEvent(SNACKBAR_NOTIF_EVENT, { detail: { message, messageType: 'warning' } })
    document.dispatchEvent(notifyEvent)
  },
}
export default notify
