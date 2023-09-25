import { createAction, props } from '@ngrx/store';
import { Auth, authData, logout, IRefreshData } from '../../core/models/auth.model';

export const authStart = createAction(
    '[Auth/API] Login Start',
    props<{ data: Auth }>(),
);

export const loginSuccess = createAction(
    '[Auth/API] Login Success',
    props<{ authData: authData }>(),
);

export const loginFailure = createAction(
    '[Auth/API] Login Failure',
    props<{ error: string }>(),
);

export const refreshAuth = createAction(
    '[Auth/API] Refresh Auth',
    props<{ data: IRefreshData}>(),
);

export const refreshSuccess = createAction(
    '[Auth/API] Refresh Auth Success',
);

export const loadLogout = createAction(
    '[Logout/API] Load Logout',
    props<{ logout: logout }>(),
);

export const loadLogoutSuccess = createAction(
    '[Logout/API] Load Logout Success',
    props<{ logout: logout }>(),
);

export const loadLogoutFailure = createAction(
    '[Logout/API] Load Logout Failure',
    props<{ error: any }>(),
);
