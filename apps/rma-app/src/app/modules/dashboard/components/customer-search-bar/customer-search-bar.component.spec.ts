import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CustomerSearchBarComponent } from './customer-search-bar.component';

describe('CustomerSearchBarComponent', () => {
    let component: CustomerSearchBarComponent;
    let fixture: ComponentFixture<CustomerSearchBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerSearchBarComponent],
            imports: [
                MatIconModule,
                MatCardModule,
                MatFormFieldModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatOptionModule,
                RouterModule,
                MatButtonModule,
                RouterTestingModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot(),
                MatInputModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerSearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    const autocomplete = {
        id: '625d0c46aced26ac70593b36',
        coustomer: 'Tonny Stark',
        createdDate: 'Thu Apr 23 1998 15:00:58 GMT+0530 (India Standard Time)',
        refID: 6758,
        status: 'Draft',
        type: 'New Account',
        gender: 'male',
        cifNumber: '10280000511312',
        customerType: 'NTP',
    };

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should go to clearInput', () => {
        component.clearInput();
    });
    it('should go to getNric', () => {
        component.getNric(autocomplete);
    });
});
