import { SNACKBAR_NOTIF_EVENT } from './useSnackbar'

const notify = {
  success: (message: string = '') => {
    const notifyEvent = new CustomEvent(SNACKBAR_NOTIF_EVENT, { detail: { message, type: 'success' } })
    document.dispatchEvent(notifyEvent)
  },
  warning: (message: string = '') => {
    const notifyEvent = new CustomEvent(SNACKBAR_NOTIF_EVENT, { detail: { message, type: 'warning' } })
    document.dispatchEvent(notifyEvent)
  },
}
export default notify
