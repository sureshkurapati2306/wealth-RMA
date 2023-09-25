/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TransactionEffects } from '../../+state/transaction.effects';
import { Environment } from 'libs/mint-office/src/lib/core/models/environment.model';
import { RmAcknowledgementComponent } from './rm-acknowledgement.component';
import { RmProductTransactionComponent } from '../rm-product-transaction/rm-product-transaction.component';
import { RmSalesComponent } from '../rm-sales/rm-sales.component';
import { TransactionService } from '../../services/transaction.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('RmAcknowledgementComponent', () => {
    let component: RmAcknowledgementComponent;
    let fixture: ComponentFixture<RmAcknowledgementComponent>;

    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatDividerModule,
                MatCardModule,
                MatButtonModule,
                MatCheckboxModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                HttpClientTestingModule,
                RouterTestingModule,
                MatDialogModule
            ],
            declarations: [RmAcknowledgementComponent, RmSalesComponent, RmProductTransactionComponent],
            providers: [
                TransactionService,
                { provide: 'environment', useValue: environment },
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RmAcknowledgementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
