import { createReducer, on } from '@ngrx/store';
import { allCustomer, getRmDetailSuccess, transactionSuccesss } from './dashboard.actions';
import { IDashboardState } from './dashboard.models';


export const DASHBOARD_FEATURE_KEY = 'transactionReducer';
export const initialState: IDashboardState = {
    rmDetails: null,
    transaction: null
};
export const transactionReducer = createReducer(
  initialState,
  on(transactionSuccesss, (state,  action ) => {
    return{
      ...state,
      transaction: action.transaction
    }
  }),

  on(getRmDetailSuccess, (state, action) =>{
      return {
          ...state,
          rmDetails: action.rmDetail,
          errorMessage: ''
      }
  }),

  on(allCustomer, (state, action) => {
    return  {
        ...state,
        customers: action.customer
    }
  })
);
