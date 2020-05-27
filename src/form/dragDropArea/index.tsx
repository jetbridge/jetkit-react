import * as React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
  },
})

interface IDragDropAreaProps {
  overlay: React.ReactElement
  children: React.ReactElement
  onFilesDrop: (files: File[]) => void
}

const DragDropArea = ({ overlay, children, onFilesDrop }: IDragDropAreaProps) => {
  const classes = useStyles()
  const [dragActive, setDragActive] = React.useState(0)

  const onDragEnter = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(prev => prev + 1)
  }, [])

  const onDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const onDragLeave = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(prev => prev - 1)
  }, [])

  const onDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setDragActive(0)

      if (event.nativeEvent.dataTransfer) {
        const files = Array.from(event.nativeEvent.dataTransfer.files)
        onFilesDrop(files)
      }
    },
    [onFilesDrop]
  )

  return (
    <div
      className={classes.root}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
      {dragActive > 0 && overlay}
    </div>
  )
}

export default DragDropArea
