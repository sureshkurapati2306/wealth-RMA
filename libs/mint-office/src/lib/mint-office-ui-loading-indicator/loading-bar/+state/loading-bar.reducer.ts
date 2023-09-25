import { createReducer, on } from '@ngrx/store';
import * as LoadingBarActions from './loading-bar.actions';

export const loadingBarFeatureKey = 'loadingBar';

export interface State {
  visibility: 'visible' | 'hidden';
}

export const initialState: State = {
  visibility: 'hidden'
};


export const reducer = createReducer(
  initialState,

  //show the loading bar
  on(LoadingBarActions.loadingBarShow, state => {
    return {
      ...state,
      visibility: 'visible'
    }
  }),

  //hide the loading bar
  on(LoadingBarActions.loadingBarHide, state => {
    return {
      ...state,
      visibility: 'hidden'
    }
  }),

);

