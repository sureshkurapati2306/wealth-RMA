import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RiskProfileResolver, RiskProfileSummaryResolver } from './risk-profile.resolver';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { StorageService } from '../services/storage.service';
import { MockStorageService } from '../mock/classes/storage.service.mock';

describe('RiskProfileResolver', () => {
    let resolver: RiskProfileResolver;
    let storageService: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                MatDialogModule,
                StoreModule.forRoot({})
            ],
            providers: [
                { provide: StorageService, useClass: MockStorageService },
            ]
        });

        resolver = TestBed.inject(RiskProfileResolver);
        storageService = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should return cif and trxId from current session', () => {
        resolver.cifNumber = 'abc';
        resolver.trxId = '1';
        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve();

        expect(spy).toReturnWith({ cifNumber: 'abc', transactionId: '1', isEdit: false });
    });

    it('should return null when no data found', () => {
        resolver.cifNumber = null;
        jest.spyOn(storageService, 'getItem').mockReturnValue(null);

        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve();

        expect(spy).toReturnWith(null);

    });
});

describe('RiskProfileSummaryResolver', () => {
    let resolver: RiskProfileSummaryResolver;
    let storageService: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                MatDialogModule,
                StoreModule.forRoot({})
            ],
            providers: [
                { provide: StorageService, useClass: MockStorageService },
            ]
        });

        resolver = TestBed.inject(RiskProfileSummaryResolver);
        storageService = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should return trxId from current session', () => {
        resolver.trxId = '1';
        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve();

        expect(spy).toReturnWith('1');
    });

});
