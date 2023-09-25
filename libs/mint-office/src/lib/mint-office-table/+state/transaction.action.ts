import { createAction, props } from '@ngrx/store';
import { TransactionDataRequestDTO, TransactionDataResponseDTO } from '../models/application-status.model';
import { InvestmentTransaction, ITransactionList } from '../models/customer-holding.model';

export const transactionStart = createAction(
    '[Transaction/API] Transaction Get Start',
    props<{ data: TransactionDataRequestDTO }>(),
);

export const transactionSuccess = createAction(
    '[Transaction/API] Transaction Table Success',
    props<{ data: TransactionDataResponseDTO }>(),
);

export const transactionFailure = createAction(
    '[Transaction/API] Transaction Table Error',
    props<{ data: string }>(),
);

export const getInvestmentTransaction = createAction(
    '[Customer/API] Get InvestmentTransaction',
    props<{ data: InvestmentTransaction }>(),
)

export const investmentTransactionSuccess = createAction(
    '[Customer/API] Investment Transaction Success',
    props<{ data: ITransactionList }>(),
)

export const investmentTransactionError = createAction(
    '[Customer/API] Investment Transaction Error',
    props<{ data: string }>(),
)
