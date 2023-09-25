import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TransactionEffects } from '../../+state/transaction.effects';
import { Environment } from 'libs/mint-office/src/lib/core/models/environment.model';
import { RmSalesComponent } from './rm-sales.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';

describe('RmSalesComponent', () => {
    let component: RmSalesComponent;
    let fixture: ComponentFixture<RmSalesComponent>;

    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };
    let store: MockStore<any>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatSelectModule,
                MatExpansionModule,
                MatDividerModule,
                MatCardModule,
                MatButtonModule,
                MatCheckboxModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                HttpClientTestingModule,
                RouterTestingModule,
                MatAutocompleteModule,
                MatDialogModule,
            ],
            declarations: [RmSalesComponent],
            providers: [
                TransactionEffects,
                { provide: 'environment', useValue: environment },
                provideMockStore({ initialState: {} }),
            ],
        });
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RmSalesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should to call isRefralEnable', () => {
        component.isRefralEnable();
        expect(component.isRefralEnable()).toBeTruthy();
    });

    
});
