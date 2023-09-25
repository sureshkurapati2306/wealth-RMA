import { createReducer, on } from '@ngrx/store';
import { authData, logout } from '../../core/models/auth.model';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
    authData: authData | null,
    loggedIn: boolean | null;
    errorMessage: string | null;
    logout: logout | null;
    isInactive?: boolean | null;
}

export const initialState: State = {
    loggedIn: false,
    authData: null as unknown as authData,
    errorMessage: '',
    logout: null as unknown as logout,
    isInactive: false
  };

export const authReducer = createReducer(
    initialState,

    on(AuthActions.authStart, (state, action) => {
        return {
            ...state,
            userDetail: action.data,
            loggedIn: state.loggedIn,
            errorMessage: ''
        }
    }),
    on(AuthActions.loginSuccess, (state, action) =>
        {
            return {
                ...state,
                authData: action.authData,
                loggedIn: true,
                errorMessage: ''
            }
        }
    ),
    on(AuthActions.loginFailure, (state, action) => {
        return {
            ...state,
            loggedIn: false,
            errorMessage: action.error
        }
    }),

    on(AuthActions.refreshAuth, (state) => {
        return {
            ...state,
            authData: null as unknown as authData,
            loggedIn: true,
            errorMessage: ''
        }
    }),

    on(AuthActions.loadLogout, (state, action) => {
        return {
            ...state,
            logout: action.logout,
            loggedIn: false,
            errorMessage: ''
        }
    }),
    on(AuthActions.loadLogoutSuccess, (state) => {
        return {
            ...state,
            loggedIn: false,
            errorMessage: ''
        }
    }),
    on(AuthActions.loadLogoutFailure, (state) => {
        return {
            ...state,
            loggedIn: false,
        }
    }),
);
