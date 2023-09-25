import { createAction, props } from '@ngrx/store';
import { Customer, CustomerProfile } from '../models/customer.model';

export const updateCimbFooterClass = createAction(
  '[Layout] Update CIMB Footer Class',
  props<{ className: string }>()
);

export const getCoustomer = createAction(
    '[CORE/API] Get Selected Customer',
    props<{ cifNumber: string }>()
)

export const customer = createAction(
    '[CORE/API] Get Selected Customer',
    props<{ data: Customer }>(),
)

export const customerProfile = createAction(
  '[Customer/API] Get Customer Profile',
  props<{ data: CustomerProfile }>(),
)

export const resetCustomerState = createAction(
    '[Customer] Reset Customer State'
)
