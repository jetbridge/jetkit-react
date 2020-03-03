import * as React from 'react';
declare type DropHandler = (file: IFileDropzone) => void;
export interface IFileDropzone extends File {
    preview?: string;
}
export interface IUseDropzone {
    isImage: boolean;
    title?: string;
    onDrop?: DropHandler;
}
/**
 * Returns onDrop handler for DropZone along with filename, preview (if image), and a file accessor.
 */
export declare function useDropzone({ isImage, title, onDrop }: IUseDropzone): {
    file: IFileDropzone | undefined;
    onDrop: (files: IFileDropzone[]) => void;
    isImage: boolean;
    title: string;
    fileName: string | undefined;
    setFile: React.Dispatch<React.SetStateAction<IFileDropzone | undefined>>;
    setFileName: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export {};
