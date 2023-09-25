import { createAction, props } from '@ngrx/store';
import {ITransactionReq, ITransaction, Customer, IRmDetails } from './dashboard.models';

export const getTransaction = createAction(
    '[Dashboard/API] Get Transaction',
    props<{ data: ITransactionReq }>(),
);

export const getRmDetail = createAction(
    '[Dashboard/API] Get RmDetail',
    props<{ data: string }>(),
);


export const transactionSuccesss = createAction(
    '[Dashboard/API] Get Transaction success',
    props<{ transaction: ITransaction }>()
);

export const getRmDetailSuccess = createAction(
    '[Dashboard/API] Get RmDetail success',
    props<{ rmDetail: IRmDetails }>()
);

export const getAllCustomer = createAction(
    '[Dashboard/API] Get All customer',
)

export const allCustomer = createAction(
    '[Dashboard/API] All customer success',
    props<{ customer: Customer[] }>()
)


