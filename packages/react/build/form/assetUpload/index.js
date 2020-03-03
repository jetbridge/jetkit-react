"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const useFileDropzone_1 = require("../fileDropzone/useFileDropzone");
const fileDropzone_1 = require("../fileDropzone");
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/styles");
const useStyles = styles_1.makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        marginBottom: '0.2rem',
    },
});
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
function AssetUpload({ model, uploadRequest, onBeforeUpload, onUploadComplete, onError, title, successTitleLabel = 'File Uploaded.', prompt, previewUrl, isImage = false, disabled, editable = true, fullSize, }) {
    const [isUploading, setIsUploading] = React.useState(false);
    const [isReset, setIsReset] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const resetUploaded = React.useCallback(() => {
        setIsUploading(false);
        setSuccess(false);
        setUploadProgress(0);
    }, [setIsUploading, setSuccess, setUploadProgress]);
    const dropzone = useFileDropzone_1.useDropzone({ isImage, title, onDrop: resetUploaded });
    const reset = React.useCallback(() => {
        resetUploaded();
        setIsReset(true);
        dropzone.setFileName(undefined);
        dropzone.setFile(undefined);
    }, [resetUploaded, dropzone]);
    const handleUploadComplete = React.useCallback((args) => {
        if (onUploadComplete)
            onUploadComplete(args);
    }, [onUploadComplete]);
    const canUpload = !!dropzone.file;
    const handleUploadClick = React.useCallback(async () => {
        const file = dropzone.file;
        let modelToUpload = model;
        // run before-upload hook
        if (onBeforeUpload) {
            // can do some model pre-creation or file validation here...
            modelToUpload = await onBeforeUpload(file);
            if (!modelToUpload) {
                console.warn('onBeforeUpload hook did not return ok status. Aborting upload.\nHook:', onBeforeUpload);
                return;
            }
        }
        if (!modelToUpload || !file)
            throw new Error(`model must be set before initiating upload`);
        // do an API request to get our presigned upload url
        const uploadReq = new uploadRequest(file, modelToUpload);
        const handleProgress = (evt) => setUploadProgress(Math.ceil((evt.loaded / evt.total) * 100));
        setIsUploading(true);
        // upload
        try {
            await uploadReq.uploadFileToS3({ model: modelToUpload, file, onProgress: handleProgress });
            handleUploadComplete({ model: modelToUpload, file, onProgress: handleProgress });
            setSuccess(true);
        }
        catch (ex) {
            console.error(ex);
            if (onError)
                onError(ex);
        }
        finally {
            setIsUploading(false);
        }
    }, [
        dropzone.file,
        model,
        setIsUploading,
        setUploadProgress,
        onBeforeUpload,
        handleUploadComplete,
        uploadRequest,
        onError,
    ]);
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(fileDropzone_1.default, Object.assign({}, dropzone, { disabled: disabled, title: title, prompt: prompt, isImage: isImage, previewUrl: previewUrl, uploadProgress: uploadProgress, editable: editable || isReset, fullSize: fullSize })),
        React.createElement("div", { className: classes.buttonWrapper },
            canUpload && !success && (React.createElement(core_1.Button, { className: classes.button, variant: "contained", color: "primary", onClick: handleUploadClick, disabled: isUploading },
                "Upload",
                isUploading && uploadProgress ? `ing... (${uploadProgress}%)` : '')),
            success && React.createElement(core_1.Typography, null, successTitleLabel),
            success && (React.createElement(core_1.Button, { color: "primary", variant: "contained", onClick: reset }, "New Upload")),
            isUploading && (React.createElement(core_1.LinearProgress, { variant: uploadProgress ? 'determinate' : 'indeterminate', value: uploadProgress, style: { width: '100%' } })))));
}
exports.default = AssetUpload;
//# sourceMappingURL=index.js.map