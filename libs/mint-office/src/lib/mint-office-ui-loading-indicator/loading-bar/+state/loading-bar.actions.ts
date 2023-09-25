import { createAction } from '@ngrx/store';

export const loadingBarShow = createAction(
  '[LoadingBar] Show'
);

export const loadingBarHide = createAction(
  '[LoadingBar] Hide'
);
