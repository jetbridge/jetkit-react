/// <reference types="react" />
import { IMessageType } from '.';
export declare const SNACKBAR_NOTIF_EVENT = "JBSnackbarNotify";
interface Options extends Event {
    detail?: {
        message: string;
        messageType: IMessageType;
    };
}
declare const useSnackbar: () => {
    open: boolean;
    handleClose: () => void;
    handleOpen: (message: any, messageType: any) => void;
    message: string;
    messageType: IMessageType;
    handleOpenFromEvent: (options: Options) => void;
};
/**
 * Component to be imported in other projects for showing Material-UI notifications
 * Listens for a CustomEvent of the following format:
 * (JBSnackbarNotify, detail: { message: 'This is an alert', messageType: 'success'})
 */
export declare const UseSnackbarUI: () => JSX.Element;
export default useSnackbar;
