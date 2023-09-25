import { ActionReducerMap, MetaReducer } from '@ngrx/store';



export const storeFeatureKey = 'store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {}

export const appReducer: ActionReducerMap<AppState> = {

};

export const metaReducers: MetaReducer<AppState>[] = [];
