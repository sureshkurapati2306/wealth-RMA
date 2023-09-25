import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TransactionRouteData, StorageService } from '@cimb/mint-office';
import { Store } from '@ngrx/store';
import { getCoustomer } from '../../customer/+state/customer.action';
import { TransactionService } from '../../transaction/services/transaction.service';

@Injectable({ providedIn: 'root' })
export class TransactionResolver implements Resolve<TransactionRouteData | null> {

    constructor(
        private readonly router: Router,
        private readonly storage: StorageService,
        private readonly store: Store,
        private readonly transactionService: TransactionService
    ) {}

    resolve(route: ActivatedRouteSnapshot): TransactionRouteData | null {
        const cifNumber = this.transactionService.cifNumber ? this.transactionService.cifNumber : this.storage.getItem<string>('cifNumber');
        const transactionType = this.transactionService.transactionType;
        const transactionid = this.transactionService.transactionId ? this.transactionService.transactionId : this.storage.getItem<string>('transactionId');
        const fundCodes = this.transactionService.fundCodes;

        this.store.dispatch(getCoustomer({cifNumber: cifNumber ? cifNumber : ''}));

        if(
            route.routeConfig &&
            route.routeConfig.path === undefined &&
            route.routeConfig.path === null
        ) {
            void this.router.navigate(['/']);
        }

        if(route.routeConfig &&
            route.routeConfig.path != undefined &&
            route.routeConfig.path != null &&
            route.routeConfig.path.includes('draft') &&
            cifNumber &&
            transactionid
        ) {
            const routeData: TransactionRouteData = {
                cifNumber: cifNumber,
                transactionType: null,
                transactionId: transactionid,
                fundCodes: null
            }

            this.updateService(routeData);
            this.updateSessionStorage(routeData);

            return routeData;
        }

        if(
            route.routeConfig &&
            route.routeConfig.path != undefined &&
            route.routeConfig.path != null &&
            cifNumber &&
            !route.routeConfig.path.includes('draft')
        ) {
            const routeData: TransactionRouteData = {
                cifNumber: cifNumber,
                transactionType: transactionType,
                transactionId: null,
                fundCodes: fundCodes
            }

            this.updateService(routeData);
            this.updateSessionStorage(routeData);

            return routeData;
        }

        void this.router.navigate(['/']);

        return null;

    }

    private updateSessionStorage(data: TransactionRouteData): void {
        this.storage.setItem('cifNumber', data.cifNumber);
        this.storage.setItem('transactionId', data.transactionId);
    }

    private updateService(data: TransactionRouteData) {
        this.transactionService.cifNumber = data.cifNumber ? data.cifNumber : null;
        this.transactionService.transactionId = data.transactionId  ? data.transactionId : null;
        this.transactionService.transactionType = data.transactionType  ? data.transactionType : null;
        this.transactionService.fundCodes = data.fundCodes  ? data.fundCodes : null;
    }
}
