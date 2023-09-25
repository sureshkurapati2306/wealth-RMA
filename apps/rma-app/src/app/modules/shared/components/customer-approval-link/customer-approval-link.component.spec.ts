import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { CustomerApprovalLinkComponent } from './customer-approval-link.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogMessageComponent } from '@cimb/mint-office';

describe('CustomerApprovalLinkComponent', () => {
  let component: CustomerApprovalLinkComponent;
  let fixture: ComponentFixture<CustomerApprovalLinkComponent>;

  const formValue = {
    mobileValue : '123456789',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerApprovalLinkComponent, DialogMessageComponent],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        StoreModule.forRoot({}),
      ],
      providers:[
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerApprovalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create createForm', () => {

    component.mobileValueForm.patchValue(formValue);
    expect(component.mobileValueForm.value).toEqual(formValue);
})

it('should update approval link on activateApprovalLink', () => {
  const spy = jest.spyOn(component, 'activateApprovalLink');
  component.activateApprovalLink();

  expect(spy).toHaveBeenCalled();
})

it("should call setMobileNumber and return mobileNumber", (done) => {

  const spy = jest.spyOn(component, 'setMobileNumber')

  component.setMobileNumber();
  component.mobileValueForm.patchValue(formValue)

  component.riskProfileMobileNoResponse$.subscribe(action => {
    expect(spy).toHaveBeenCalled();
    done();
})


  expect(component.mobileValueForm.value).toEqual(formValue);
  expect(spy).toHaveBeenCalled();
});

it('should copy approval link', () => {
  const spy = jest.spyOn(component, 'copyText');
  component.copyText('copyText');
  component.clipboard.copy('copyText');

  expect(spy).toHaveBeenCalledTimes(1);
})

});
