import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { RiskProfileSummaryComponent } from './risk-profile-summary.component';

describe('RiskProfileSummaryComponent', () => {
  let component: RiskProfileSummaryComponent;
  let fixture: ComponentFixture<RiskProfileSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskProfileSummaryComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              transactionId: 37
            }),
            parent: {
              data: of({
                cifNumber: '123',
                transactionId: 37
              })
            }
          }
      }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should go to gotoRiskProfileEdit()', () => {
    component.gotoRiskProfileEdit()
  });

  it('should go to gotoCustomerProfile()', () => {
    component.gotoCustomerProfile();
  });

  it('should go to transformDate()', () => {
    const date = 'new date'
    component.transformDate(date)
  });

});
