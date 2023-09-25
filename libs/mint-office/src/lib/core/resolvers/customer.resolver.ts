import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Store } from '@ngrx/store';
import { getCoustomer } from '../+state/mint-office.actions';

@Injectable({ providedIn: 'root' })
export class CustomerResolver implements Resolve<string | null> {

    private _cifNumber: string | null;

    constructor(
        private readonly storageService: StorageService,
        private readonly store: Store,
        private readonly router: Router
    ) {}

    // -------------------------------------------------------------------------------------------
    // @Accessors method
    // -------------------------------------------------------------------------------------------

    get cifNumber(): string | null {
        return this._cifNumber;
    }

    set cifNumber(cif: string | null) {
        this._cifNumber = cif;
    }

    resolve(): string | null {
        const selectedCifNumber = this.cifNumber ? this.cifNumber : this.storageService.getItem('cifNumber');
        if(selectedCifNumber) {
            this.store.dispatch(getCoustomer({cifNumber: selectedCifNumber as string}));
            this.cifNumber = selectedCifNumber as string;
            this.storageService.setItem('cifNumber', selectedCifNumber);
            return selectedCifNumber as string;
        }
        void this.router.navigate(['/']);

        return null;
    }
}
