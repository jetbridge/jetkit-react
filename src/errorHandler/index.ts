import { AxiosError } from 'axios'
import notify from '../snackbarCustom/notify'

export const handleError = (error: AxiosError, resourceName?: string) => {
  let message = 'Something went wrong. Please try again later.'
  const response = error.response
  if (response) {
    if (response.status === 404) {
      message = `${resourceName || 'Resource'} not found`
    } else if (response.data) {
      message = response.data.message
    }
  }
  notify.error(message)
}
