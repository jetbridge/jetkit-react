export interface PrepareUploadResponse {
    url: string;
    headers: object;
}
export interface UploadFileToS3Args<MT = {}> {
    model?: MT;
    file: File;
    onProgress?: (evt: ProgressEvent) => void;
}
export declare type UploadRequestClass<MT = {}> = new (file: File, model?: MT) => UploadRequest<MT>;
/**
 * Class responsible for asking backend for a presigned S3 PutObject API call and then sending a file to S3 with it.
 * To use it, extend it and define `prepareUploadRequest`.
 * Can be passed to `AssetUpload` or used on its own.
 */
export declare abstract class UploadRequest<MT = {}> {
    /**
     *
     * @param file File object to upload.
     * @param model Optional instance of related model that this asset is associated with.
     */
    protected abstract prepareUploadRequest(file: File, model?: MT): Promise<PrepareUploadResponse>;
    protected abstract prepareUploadRequest(file: File): Promise<PrepareUploadResponse>;
    model?: MT;
    file: File;
    constructor(file: File, model?: MT);
    /**
     * Ask server to prepare a presigned S3 upload request and then PUT the file to S3.
     */
    uploadFileToS3({ onProgress }: UploadFileToS3Args<MT>): Promise<import("axios").AxiosResponse<any>>;
}
