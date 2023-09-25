import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from '../services/storage.service';
import { getCoustomer } from '../+state/mint-office.actions';


@Injectable({ providedIn: 'root' })
export class NewApplicationResolver implements Resolve<string | null> {
    private _cifNumber: string | null;
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

    resolve(): string | null {
        const cifNumber = this.cifNumber ? this.cifNumber : this.storage.getItem<string>('cifNumber')
        if(!this.cifNumber && cifNumber) {
            this.store.dispatch(getCoustomer({cifNumber: cifNumber}));
        }

        if(!cifNumber) {
            void this.router.navigate(['/']);
        }

        this.cifNumber = cifNumber;
        return cifNumber;
    }

}
