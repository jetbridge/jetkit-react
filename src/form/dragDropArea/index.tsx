import * as React from 'react'

interface IDragDropAreaProps {
  overlay: React.ReactElement
  children: React.ReactElement
  onFilesDrop: (files: File[]) => void
  className?: string
}

const DragDropArea = ({ overlay, children, onFilesDrop, className }: IDragDropAreaProps) => {
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
      className={className}
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
