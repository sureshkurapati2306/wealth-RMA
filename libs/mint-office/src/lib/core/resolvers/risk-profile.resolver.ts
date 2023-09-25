import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from '../services/storage.service';
import { getCoustomer } from '../+state/mint-office.actions';

export interface RiskProfileRouteData {
    [key: string]: any,
    cifNumber: string | null,
    transactionId: string | null,
    isEdit:boolean,
}

@Injectable({ providedIn: 'root' })
export class RiskProfileResolver implements Resolve<RiskProfileRouteData | null> {
    private _cifNumber: string | null;
    private _trxId: string | null;
    private _isEdit = false;

    constructor(
        private readonly router: Router,
        private readonly storage: StorageService,
        private store: Store
    ) {}

    get cifNumber(): string | null {
        return this._cifNumber;
    }

    set cifNumber(cif: string | null) {
        this._cifNumber = cif;
    }

    get trxId(): string | null {
        return this._trxId;
    }

    set trxId(trxId: string | null) {
        this._trxId = trxId;
    }

    get isEdit(): boolean {
        return this._isEdit
    }

    set isEdit(e: boolean) {
        this._isEdit = e;
    }


    resolve(): RiskProfileRouteData | null {
        const cifNumber = this.cifNumber? this.cifNumber : this.storage.getItem<string>('cifNumber');
        const transactionId = this.trxId ? this.trxId : this.storage.getItem<string>('transactionId');
        if(!this.cifNumber && cifNumber) {
            this.store.dispatch(getCoustomer({cifNumber: cifNumber}));
        }


        if(cifNumber) {
            const routeData: RiskProfileRouteData = {
                cifNumber: cifNumber,
                transactionId: transactionId,
                isEdit: this.isEdit
            }

            this.cifNumber = cifNumber;
            this.trxId = transactionId;
            this.updateSessionStorage(routeData);

            return routeData;
        }

        void this.router.navigate(['/']);

        return null;

    }

    private updateSessionStorage(data: RiskProfileRouteData): void {
        this.storage.setItem('cifNumber', data.cifNumber);
        this.storage.setItem('transactionId', data.transactionId);
    }

}

@Injectable({ providedIn: 'root' })
export class RiskProfileSummaryResolver implements Resolve<string | null> {
    private _trxId: string | null;
    constructor(
        private readonly router: Router,
        private readonly storage: StorageService,
        private store: Store
    ) {}

    get trxId(): string | null {
        return this._trxId;
    }

    set trxId(trxId: string | null) {
        this._trxId = trxId;
    }


    resolve(): string | null {
        const transactionId = this.trxId ? this.trxId : this.storage.getItem<string>('transactionId');

        if(transactionId) {
            this.storage.setItem('transactionId', transactionId);

            return transactionId;
        }

        void this.router.navigate(['/']);

        return null;

    }

}
