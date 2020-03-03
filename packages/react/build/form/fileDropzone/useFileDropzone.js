"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/**
 * Returns onDrop handler for DropZone along with filename, preview (if image), and a file accessor.
 */
function useDropzone({ isImage = false, title = '', onDrop }) {
    const [file, setFile] = React.useState();
    const [fileName, setFileName] = React.useState();
    const onDrop_ = React.useCallback((files) => {
        if (!files || !files[0]) {
            return;
        }
        const droppedFile = files[0];
        // process file
        setFileName(droppedFile.name);
        if (isImage) {
            // generate image preview URL
            setFile({ ...droppedFile, preview: URL.createObjectURL(droppedFile) });
        }
        else {
            setFile(droppedFile);
        }
        if (onDrop && file)
            onDrop(file);
    }, [isImage, onDrop, file]);
    return { file, onDrop: onDrop_, isImage, title, fileName, setFile, setFileName };
}
exports.useDropzone = useDropzone;
//# sourceMappingURL=useFileDropzone.js.map