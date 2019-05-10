import { createStandardAction, getType } from 'typesafe-actions';
export const initialState = {};
export const storeAccessToken = createStandardAction('auth/storeAccessToken')();
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case getType(storeAccessToken): {
            if (!state.tokens || !state.tokens.refresh_token) {
                console.error('got storeAccessToken but we are missing refresh token. cannot continue.');
                return state;
            }
            return Object.assign({}, state, { tokens: Object.assign({}, state.tokens, { access_token: action.payload }) });
        }
        default: {
            return state;
        }
    }
};
export const isAuthenticated = (state) => {
    return !!(state.auth.tokens && state.auth.tokens.access_token);
};
export { reducer as authReducer };
//# sourceMappingURL=auth.js.map