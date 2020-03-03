"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_dropzone_1 = require("react-dropzone");
const React = require("react");
const styles_1 = require("@material-ui/styles");
const classnames_1 = require("classnames");
const CloudUpload_1 = require("@material-ui/icons/CloudUpload");
const CloudQueue_1 = require("@material-ui/icons/CloudQueue");
const useStyles = styles_1.makeStyles({
    dropzoneContainer: {
        borderRadius: 3,
        minWidth: 266,
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
        minWidth: 266,
        display: 'flex',
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
});
const FileDropzone = (props) => {
    const { file, onDrop, isImage, title, filename, prompt, previewUrl, uploadProgress, editable = true, fullSize, disabled, ...dropzoneOptions } = props;
    // react-dropzone
    const { getRootProps, getInputProps, isDragActive } = react_dropzone_1.useDropzone({ onDrop, ...dropzoneOptions });
    const classes = useStyles(props);
    // render existing image preview if we have one and user hasn't selected a new file
    const bgImage = previewUrl && !file ? React.createElement("img", { src: previewUrl, alt: "Uploading...", className: classes.previewImg }) : null;
    // render preview of image about to be uploaded
    const thumbs = React.useCallback(() => {
        return (React.createElement("div", { className: classes.thumb },
            React.createElement("div", { className: classes.thumbInner }, file && (React.createElement(React.Fragment, null,
                React.createElement("img", { src: file.preview, alt: file.name, className: classes.img }),
                uploadProgress && uploadProgress < 100 ? (React.createElement("div", { className: classes.thumbCover, style: { height: `${100 - uploadProgress}%` } }, "\u00A0")) : null)))));
    }, [file, classes, uploadProgress]);
    // calculate file name to display
    const filenameDisplay = React.useMemo(() => {
        if (filename)
            return filename;
        if (file && file.name)
            return file.name;
        return '';
    }, [filename, file]);
    return (React.createElement("div", { className: classnames_1.default({ [classes.disabled]: disabled, [classes.notEditable]: !editable }) },
        title && React.createElement("label", { className: classes.label }, title),
        React.createElement("div", Object.assign({}, getRootProps(), { className: classnames_1.default(classes.dropzoneContainer, fullSize && classes.dropzoneContainerFullSize) }),
            bgImage,
            React.createElement("div", { style: { zIndex: 2 } },
                React.createElement("input", Object.assign({}, getInputProps())),
                React.createElement("div", { className: classnames_1.default(classes.dropzoneContent, fullSize && classes.dropzoneContentFullSize) },
                    !file && (React.createElement("div", { className: classnames_1.default(classes.uploadPromptContainer, fullSize && classes.uploadPromptContainerFullSize) },
                        isDragActive ? React.createElement(CloudQueue_1.default, { className: classes.icon }) : React.createElement(CloudUpload_1.default, { className: classes.icon }),
                        React.createElement("div", { className: classnames_1.default(!fullSize && classes.messageBlock) },
                            React.createElement("h4", { className: classnames_1.default(classes.heading, fullSize && classes.textFullSize) }, prompt || ''),
                            isDragActive ? (React.createElement("p", { className: classnames_1.default(classes.text, fullSize && classes.textFullSize) }, "Drop file here")) : (React.createElement("p", { className: classnames_1.default(classes.text, fullSize && classes.textFullSize) },
                                "Drag and drop a file here,",
                                React.createElement("br", null),
                                " or click to select a file."))))),
                    filenameDisplay && !isImage ? React.createElement("aside", { className: classes.thumbsContainer }, filenameDisplay) : null,
                    isImage && React.createElement("aside", { className: classes.thumbsContainer }, thumbs()))))));
};
exports.default = FileDropzone;
//# sourceMappingURL=index.js.map