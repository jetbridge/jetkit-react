import { IAuthTokens, TokenRefreshRequest } from 'axios-jwt';
export declare const apiClient: import("axios").AxiosInstance;
export interface IAuthResponse {
    access_token: string;
    refresh_token: string;
}
export declare const authResponseToAuthTokens: (res: IAuthResponse) => IAuthTokens;
/**
 * Process an AuthResponse from auth API and save JWT.
 */
export declare const setAuthTokensFromAuthResponse: (res: IAuthResponse) => Promise<IAuthTokens>;
export declare const requestRefresh: TokenRefreshRequest;
export declare const refreshTokenIfNeeded: () => Promise<string | undefined>;
export default apiClient;
