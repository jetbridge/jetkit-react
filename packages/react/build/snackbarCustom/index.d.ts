/// <reference types="react" />
export declare type IMessageType = 'success' | 'warning' | 'info' | 'error';
interface ISnackbar {
    open: boolean;
    handleClose: () => void;
    handleOpen: (message: string, warning?: boolean) => void;
    message: string;
    messageType: IMessageType;
}
declare const SnackbarCustom: (props: ISnackbar) => JSX.Element;
export default SnackbarCustom;
