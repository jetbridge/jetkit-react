const notify = {
  success: (message: string = '') => {
    const notifyEvent = new CustomEvent('notify', { detail: { message, type: 'success' } })
    document.dispatchEvent(notifyEvent)
  },
  warning: (message: string = '') => {
    const notifyEvent = new CustomEvent('notify', { detail: { message, type: 'warning' } })
    document.dispatchEvent(notifyEvent)
  },
}
export default notify
