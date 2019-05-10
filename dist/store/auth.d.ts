import { Reducer } from 'redux';
export interface IAuthenticatedApplicationState {
    auth: IUserCredential;
}
export interface ICredentials {
    readonly refresh_token: string;
    readonly access_token: string;
}
export declare type IUserType = 'client' | 'stuff';
export interface IUser {
    readonly id?: number;
    readonly name?: string;
    readonly email?: string;
    readonly user_type?: IUserType;
}
export interface IUserCredential {
    readonly tokens?: ICredentials;
    readonly user?: IUser;
}
export declare const initialState: IUserCredential;
export declare const storeAccessToken: import("typesafe-actions").PayloadAC<"auth/storeAccessToken", string>;
declare const reducer: Reducer<IUserCredential>;
export declare const isAuthenticated: (state: IAuthenticatedApplicationState) => boolean;
export { reducer as authReducer };
