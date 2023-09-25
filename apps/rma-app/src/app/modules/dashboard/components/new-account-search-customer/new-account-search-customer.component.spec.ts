import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MintOfficeBreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MintOfficePageTitleComponent } from '../../../shared/components/page-title/page-title.component';
import { CustomerSearchBarComponent } from '../customer-search-bar/customer-search-bar.component';
import { NewAccountSearchCustomerComponent } from './new-account-search-customer.component';

describe('NewAccountSearchCustomerComponent', () => {
  let component: NewAccountSearchCustomerComponent;
  let fixture: ComponentFixture<NewAccountSearchCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewAccountSearchCustomerComponent,
        CustomerSearchBarComponent,
        MintOfficeBreadcrumbComponent,
        MintOfficePageTitleComponent
    ],
      imports: [
        CommonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        BrowserAnimationsModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountSearchCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
