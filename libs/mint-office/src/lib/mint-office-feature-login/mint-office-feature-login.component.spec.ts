import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { MintOfficeFeatureLoginComponent } from './mint-office-feature-login.component';
import { Actions } from '@ngrx/effects';
import { MatDialogModule } from '@angular/material/dialog';

describe('MintOfficeFeatureLoginComponent', () => {
  let component: MintOfficeFeatureLoginComponent;
  let fixture: ComponentFixture<MintOfficeFeatureLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeFeatureLoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [Actions],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeFeatureLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
