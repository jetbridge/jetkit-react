"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
/**
 * Class responsible for asking backend for a presigned S3 PutObject API call and then sending a file to S3 with it.
 * To use it, extend it and define `prepareUploadRequest`.
 * Can be passed to `AssetUpload` or used on its own.
 */
class UploadRequest {
    constructor(file, model) {
        this.model = model;
        this.file = file;
    }
    /**
     * Ask server to prepare a presigned S3 upload request and then PUT the file to S3.
     */
    async uploadFileToS3({ onProgress }) {
        const { file, model } = this;
        const uploadResponse = await this.prepareUploadRequest(file, model);
        const options = {
            headers: {
                'Content-Type': file.type,
                ...uploadResponse.headers,
            },
            onUploadProgress: onProgress,
        };
        return axios_1.default.put(uploadResponse.url, file, options);
    }
}
exports.UploadRequest = UploadRequest;
//# sourceMappingURL=asset.js.map