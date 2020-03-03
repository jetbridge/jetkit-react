/// <reference types="react" />
import { IFileDropzone } from '../fileDropzone/useFileDropzone';
import { UploadFileToS3Args, UploadRequestClass } from '../../apiClient/asset';
export interface IAssetUpload<MT = {}> {
    model?: MT;
    uploadRequest: UploadRequestClass<MT>;
    onBeforeUpload?: (file?: IFileDropzone) => Promise<MT | undefined>;
    onUploadComplete?: (args: UploadFileToS3Args<MT>) => void;
    onError?: (error: Error) => void;
    title?: string;
    successTitleLabel?: string;
    prompt?: string;
    isImage?: boolean;
    previewUrl?: string;
    disabled?: boolean;
    editable?: boolean;
    fullSize?: boolean;
}
/**
 * A component for handling file uploads of assets to S3.
 *
 * An API call must be made to retrieve a presigned S3 upload URL.
 * After getting the presigned URL, a PUT of the file must be made to S3 directly.
 * The API call is made right before uploading because the upload URL can expire.
 *
 * The endpoint URL should accept a POST and return a `PrepareUploadResponse`.
 *
 * @param MT Type of model related to this asset.
 */
declare function AssetUpload<MT = {}>({ model, uploadRequest, onBeforeUpload, onUploadComplete, onError, title, successTitleLabel, prompt, previewUrl, isImage, disabled, editable, fullSize, }: IAssetUpload<MT>): JSX.Element;
export default AssetUpload;
