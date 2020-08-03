import axios, { AxiosRequestConfig } from 'axios'

export interface PrepareUploadResponse {
  url: string
  headers: object
}

export interface UploadFileToS3Args<MT = {}> {
  model?: MT
  file: File
  onProgress?: (evt: ProgressEvent) => void
}

// type representing a class of type UploadRequest
export type UploadRequestClass<MT = {}> = new (file: File, model?: MT) => UploadRequest<MT>

/**
 * Class responsible for asking backend for a presigned S3 PutObject API call and then sending a file to S3 with it.
 * To use it, extend it and define `prepareUploadRequest`.
 * Can be passed to `AssetUpload` or used on its own.
 */
export abstract class UploadRequest<MT = {}> {
  /**
   *
   * @param file File object to upload.
   * @param model Optional instance of related model that this asset is associated with.
   */
  protected abstract async prepareUploadRequest(file: File, model?: MT): Promise<PrepareUploadResponse>
  protected abstract async prepareUploadRequest(file: File): Promise<PrepareUploadResponse>

  public model?: MT
  public file: File

  public constructor(file: File, model?: MT) {
    this.model = model
    this.file = file
  }

  /**
   * Ask server to prepare a presigned S3 upload request and then PUT the file to S3.
   */
  public async uploadFileToS3({ onProgress }: UploadFileToS3Args<MT>) {
    const { file, model } = this
    const uploadResponse = await this.prepareUploadRequest(file, model)

    const options: AxiosRequestConfig = {
      headers: {
        'Content-Type': file.type,
        ...uploadResponse.headers,
      },
      onUploadProgress: onProgress,
    }

    return axios.put(uploadResponse.url, file, options)
  }
}
