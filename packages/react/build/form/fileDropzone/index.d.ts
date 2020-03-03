/// <reference types="react" />
import { DropzoneOptions } from 'react-dropzone';
import { IFileDropzone } from './useFileDropzone';
export interface IFileDropzoneProps extends DropzoneOptions {
    file?: IFileDropzone;
    isImage?: boolean;
    title?: string;
    filename?: string;
    prompt?: string;
    onDrop: (files: IFileDropzone[]) => void;
    previewUrl?: string;
    uploadProgress?: number;
    disabled?: boolean;
    editable?: boolean;
    fullSize?: boolean;
}
declare const FileDropzone: (props: IFileDropzoneProps) => JSX.Element;
export default FileDropzone;
