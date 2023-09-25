import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCoustomer } from '../+state/mint-office.actions';
import { StorageService } from '../services/storage.service';

export interface OrderSummaryRouteData {
    cifNumber: string | null;
    transactionRefId: string | null;
    transactionId: string | null;
}
@Injectable({ providedIn: 'root' })
export class OrderSummaryResolver implements Resolve<OrderSummaryRouteData | null> {

    private _transactionRefId: string | null;
    private _transactionId: string | null;
    private _cifNumber: string | null;

    constructor(
        private readonly router: Router,
        private readonly storage: StorageService,
        private readonly store: Store
    ) { }

    get cifNumber(): string | null {
        return this._cifNumber;
    }

    set cifNumber(cif: string | null) {
        this._cifNumber = cif;
    }

    get transactionRefId(): string | null {
        return this._transactionRefId;
    }

    set transactionRefId(id: string | null) {
        this._transactionRefId = id;
    }

    get transactionId(): string | null {
        return this._transactionId;
    }

    set transactionId(id: string | null) {
        this._transactionId = id;
    }

    resolve(): OrderSummaryRouteData | null {
        const cifNumber = this.cifNumber? this.cifNumber : this.storage.getItem<string>('cifNumber');
        const trxId = this.transactionId ? this.transactionId :  this.storage.getItem<string>('transactionId');
        const trxRefId = this.transactionRefId ? this.transactionRefId :  this.storage.getItem<string>('transactionRefId')
        
        if(!this.cifNumber && cifNumber) {
            this.store.dispatch(getCoustomer({cifNumber: cifNumber}));
        }

        this.cifNumber = cifNumber;
        this.storage.setItem('cifNumber', cifNumber);


        if (this.transactionRefId) {
            this.storage.setItem('transactionId', this.transactionId);
            this.storage.setItem('transactionRefId', this.transactionRefId);
            return {
                cifNumber: cifNumber,
                transactionId: trxId,
                transactionRefId: trxRefId
            }
        }

        return null;

    }

}
