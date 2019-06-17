import * as React from 'react'

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
export default useSnackbar
