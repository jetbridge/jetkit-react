import { IUserCredential } from '../store/auth';
declare const _default: {
    login: <UT>(email: string, password: string) => Promise<IUserCredential & UT>;
};
export default _default;
