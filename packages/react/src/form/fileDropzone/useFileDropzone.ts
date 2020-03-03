import * as React from 'react'

type DropHandler = (file: IFileDropzone) => void

export interface IFileDropzone extends File {
  preview?: string
}

export interface IUseDropzone {
  isImage: boolean
  title?: string
  onDrop?: DropHandler
}

/**
 * Returns onDrop handler for DropZone along with filename, preview (if image), and a file accessor.
 */
export function useDropzone({ isImage = false, title = '', onDrop }: IUseDropzone) {
  const [file, setFile] = React.useState<IFileDropzone>()
  const [fileName, setFileName] = React.useState<string | undefined>()

  const onDrop_ = React.useCallback(
    (files: IFileDropzone[]) => {
      if (!files || !files[0]) {
        return
      }

      const droppedFile = files[0]

      // process file
      setFileName(droppedFile.name)
      if (isImage) {
        // generate image preview URL
        setFile({ ...droppedFile, preview: URL.createObjectURL(droppedFile) })
      } else {
        setFile(droppedFile)
      }

      if (onDrop && file) onDrop(file)
    },
    [isImage, onDrop, file]
  )

  return { file, onDrop: onDrop_, isImage, title, fileName, setFile, setFileName }
}
