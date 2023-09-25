import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  State } from './auth.reducer';

import jwt_decode from "jwt-decode";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<State>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  /* istanbul ignore else */
  if(state) {
    return state.loggedIn ? true : false;
  }
  return null
});
export const getToken = createSelector(getAuthState, (state) => {
  /* istanbul ignore else */
  if(state) {
    return state?.authData ? state?.authData.access_token : null;
  }
  return null

});

export const getUserDetail = createSelector(getAuthState, (state) => {
  /* istanbul ignore else */
  if(state && state?.authData) {
    const token = state?.authData.access_token;
    const decode_token: Record<string, string> = jwt_decode(token);
    return decode_token.preferred_username;
  }
  return null

});

export const getGroupName = createSelector(getAuthState, (state) => {
  /* istanbul ignore else */
  if(state && state?.authData) {
    const token = state?.authData.access_token;
    const decode_token: Record<string, string> = jwt_decode(token);
    return decode_token.groupId;
  }
  return null

});

export const getErrorMessage = createSelector(getAuthState, (state) => {
  /* istanbul ignore else */
  if(state) {
    return state.errorMessage;
  }
  return null

})
