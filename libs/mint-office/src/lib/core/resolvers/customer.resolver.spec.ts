import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStorageService } from '../mock/classes/storage.service.mock';
import { StorageService } from '../services/storage.service';
import { CustomerResolver } from './customer.resolver';

describe('CustomerResolver', () => {
    let resolver: CustomerResolver;
    let storageService: StorageService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({})
            ],
            providers: [
                { provide: StorageService, useClass: MockStorageService },
            ],
        });
        resolver = TestBed.inject(CustomerResolver);
        storageService = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should return cif from current session', () => {
        resolver.cifNumber = 'abc';
        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve();

        expect(spy).toReturnWith('abc');
    });

    it('should get data from session storage', () => {
        jest.spyOn(storageService, 'getItem').mockReturnValue('abc');
        resolver.cifNumber = null;

        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve();

        expect(spy).toReturnWith('abc');
    });

    it('should return null when no data found', () => {
        resolver.cifNumber = null;
        jest.spyOn(storageService, 'getItem').mockReturnValue(null);

        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve();

        expect(spy).toReturnWith(null);

    });
});
