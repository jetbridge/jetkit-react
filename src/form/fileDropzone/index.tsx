import { useDropzone, DropzoneOptions } from 'react-dropzone'
import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'
import DropIcon from '@material-ui/icons/CloudUpload'
import DragActiveIcon from '@material-ui/icons/CloudQueue'
import { IFileDropzone } from './useFileDropzone'

const useStyles = makeStyles({
  dropzoneContainer: {
    borderRadius: 3,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 92,
  },
  dropzoneContainerFullSize: {
    height: 200,
    minWidth: 200,
    padding: '1rem',
  },
  uploadPromptContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  uploadPromptContainerFullSize: {
    flexDirection: 'column',
  },
  label: {
    textTransform: 'capitalize',
    margin: '15px 0px',
    display: 'block',
  },
  dropzoneContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropzoneContentFullSize: {
    height: 250,
  },
  heading: {
    margin: '15px 0px 0px 0px',
  },
  icon: {
    fontSize: '50px',
  },
  messageBlock: {
    marginLeft: '35px',
  },
  text: {
    width: '100%',
    marginTop: 2,
    color: '#000',
    fontSize: 14,
  },
  textFullSize: {
    textAlign: 'center',
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    boxSizing: 'border-box',
  },
  thumbCover: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'white',
    zIndex: 4,
    width: '100%',
  },
  thumbInner: {
    minWidth: 0,
    display: 'block',
    height: '100%',
  },
  img: {
    display: 'block',
    width: 'auto',
    maxWidth: '100%',
    objectFit: 'cover',
    zIndex: 3,
  },
  thumbsContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  notEditable: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  previewImg: {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    zIndex: 10,
  },
  placeholderIcon: {
    width: '50px',
    height: '50px',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
})

export interface IFileDropzoneProps extends DropzoneOptions {
  value?: IFileDropzone
  isImage?: boolean
  title?: string
  fileName?: string
  prompt?: string
  onDrop: (files: IFileDropzone[]) => void
  previewUrl?: string
  uploadProgress?: number
  disabled?: boolean
  editable?: boolean
  fullSize?: boolean
}

const FileDropzone = (props: IFileDropzoneProps) => {
  const {
    value,
    onDrop,
    isImage,
    title,
    fileName,
    prompt,
    previewUrl,
    uploadProgress,
    editable = true,
    fullSize,
    disabled,
    ...dropzoneOptions
  } = props

  // react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, ...dropzoneOptions })
  const classes = useStyles(props)

  // render existing image preview if we have one and user hasn't selected a new file
  const bgImage =
    previewUrl && !value ? <img src={previewUrl} alt="Uploading..." className={classes.previewImg} /> : null

  // render preview of image about to be uploaded
  const thumbs = React.useCallback(() => {
    return (
      <div className={classes.thumb}>
        <div className={classes.thumbInner}>
          {value && (
            <React.Fragment>
              <img src={value.preview} alt={value.name} className={classes.img} />
              {uploadProgress && uploadProgress < 100 ? (
                <div className={classes.thumbCover} style={{ height: `${100 - uploadProgress}%` }}>
                  &nbsp;
                </div>
              ) : null}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }, [value, classes, uploadProgress])

  return (
    <div className={classNames({ [classes.disabled]: disabled, [classes.notEditable]: !editable })}>
      {title && <label className={classes.label}>{title}</label>}
      <div
        {...getRootProps()}
        className={classNames(classes.dropzoneContainer, fullSize && classes.dropzoneContainerFullSize)}
      >
        {bgImage}

        <div style={{ zIndex: 2 }}>
          <input {...getInputProps()} />
          <div className={classNames(classes.dropzoneContent, fullSize && classes.dropzoneContentFullSize)}>
            {!value && (
              <div
                className={classNames(classes.uploadPromptContainer, fullSize && classes.uploadPromptContainerFullSize)}
              >
                {isDragActive ? <DragActiveIcon className={classes.icon} /> : <DropIcon className={classes.icon} />}
                <div className={classNames(!fullSize && classes.messageBlock)}>
                  <h4 className={classNames(classes.heading, fullSize && classes.textFullSize)}>{prompt || ''}</h4>
                  {isDragActive ? (
                    <p className={classNames(classes.text, fullSize && classes.textFullSize)}>Drop file here</p>
                  ) : (
                    <p className={classNames(classes.text, fullSize && classes.textFullSize)}>
                      Drag and drop a file here,
                      <br /> or click to select a file.
                    </p>
                  )}
                </div>
              </div>
            )}
            {value && !isImage && <aside className={classes.thumbsContainer}>{fileName}</aside>}
            {isImage && <aside className={classes.thumbsContainer}>{thumbs()}</aside>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default FileDropzone
