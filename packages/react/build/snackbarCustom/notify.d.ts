declare const notify: {
    success: (message?: string) => void;
    warning: (message?: string) => void;
    error: (message?: string) => void;
};
export default notify;
