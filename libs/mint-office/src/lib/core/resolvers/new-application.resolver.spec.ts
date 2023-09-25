import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NewApplicationResolver } from './new-application.resolver';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MockStorageService } from '../mock/classes/storage.service.mock';
import { StorageService } from '../services/storage.service';

describe('NewApplicationResolver', () => {
    let resolver: NewApplicationResolver;
    let storageService: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule, 
                HttpClientTestingModule,
                MatDialogModule, 
                StoreModule.forRoot({})
            ],
            providers:[
                { provide: StorageService, useClass: MockStorageService },
            ]
        });
        
        resolver = TestBed.inject(NewApplicationResolver);
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
});
