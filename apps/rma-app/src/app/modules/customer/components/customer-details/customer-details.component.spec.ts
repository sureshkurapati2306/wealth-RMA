import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockCustomerProfile } from '@cimb/mint-office';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerDetailsComponent } from './customer-details.component';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  const matselect_mobile_selector = 'div.mobile .mat-select';

 const dialogMock = {
    open () { /* Mock */},
    afterClosed () { /* Mock */}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsComponent ],
      imports: [
          CommonModule,
          MatExpansionModule,
          MatDividerModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatTooltipModule,
          FormsModule,
          ReactiveFormsModule,
          NoopAnimationsModule,
          MatDialogModule,
          StoreModule.forRoot(provideMockStore),
          HttpClientModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    component.customerDetails = { ...MockCustomerProfile };
    console.log(component.customerDetails);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to email on selecting option from mat-select ', async() => {
    component.customerDetails = MockCustomerProfile;

    const spy = jest.spyOn(component, 'onEmailChange');

    const openDialogSpy = jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('Yes, use this email')} as MatDialogRef<typeof component>)

    const select = fixture.debugElement.query(By.css('div.email_test .mat-select'));
    const mat_select = select.nativeElement as HTMLSelectElement;
    expect(mat_select).not.toBe(null);

    select.triggerEventHandler('selectionChange', {target: {}});

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(openDialogSpy).toHaveBeenCalled();
  })

  it('should to mobile on selecting option from mat-select ', async() => {
    component.customerDetails = MockCustomerProfile;

    const spy = jest.spyOn(component, 'onMobileNumberChange');

    const openDialogSpy = jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('Yes, use this number')} as MatDialogRef<typeof component>)

    const select = fixture.debugElement.query(By.css(matselect_mobile_selector));
    const mat_select = select.nativeElement as HTMLSelectElement;
    expect(mat_select).not.toBe(null);
    
    select.triggerEventHandler('selectionChange', {target: {value: 'mobile', cif: '12345678'}});

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(openDialogSpy).toHaveBeenCalled();
  })

  it('should to empty string on selecting option from mat-select ', async() => {
    component.customerDetails = MockCustomerProfile;

    const spy = jest.spyOn(component, 'onMobileNumberChange');

    const openDialogSpy = jest.spyOn(component.dialog, 'open').mockReturnValue({ afterClosed: () => of('')} as MatDialogRef<typeof component>)

    const select = fixture.debugElement.query(By.css(matselect_mobile_selector));
    const mat_select = select.nativeElement as HTMLSelectElement;
    expect(mat_select).not.toBe(null);
    
    select.triggerEventHandler('selectionChange', {target: {}});

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(openDialogSpy).toHaveBeenCalled();
  })

  it('should to check  mobile number and mobile number on ngOninit ', () => {
    component.customerDetails = {...MockCustomerProfile, mobileNumber: "999999999999"};

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.mobileNumber.value).toBe("999999999999");
  })

});

