import { SNACKBAR_NOTIF_EVENT } from './useSnackbar'

const notify = {
  success: (message = 'Success') => {
    const notifyEvent = new CustomEvent(SNACKBAR_NOTIF_EVENT, { detail: { message, messageType: 'success' } })
    document.dispatchEvent(notifyEvent)
  },
  warning: (message = 'Error') => {
    const notifyEvent = new CustomEvent(SNACKBAR_NOTIF_EVENT, { detail: { message, messageType: 'warning' } })
    document.dispatchEvent(notifyEvent)
  },
  error: (message = '') => {
    const notifyEvent = new CustomEvent(SNACKBAR_NOTIF_EVENT, { detail: { message, messageType: 'error' } })
    document.dispatchEvent(notifyEvent)
  },
}
export default notify
