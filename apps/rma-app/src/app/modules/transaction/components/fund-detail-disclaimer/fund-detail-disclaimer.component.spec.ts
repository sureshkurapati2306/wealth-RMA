import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundDetailDisclaimerComponent } from './fund-detail-disclaimer.component';

describe('FundDetailDisclaimerComponent', () => {
  let component: FundDetailDisclaimerComponent;
  let fixture: ComponentFixture<FundDetailDisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundDetailDisclaimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDetailDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
