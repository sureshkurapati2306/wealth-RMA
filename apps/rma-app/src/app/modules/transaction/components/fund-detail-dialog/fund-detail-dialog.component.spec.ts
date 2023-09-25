import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FundDetailDialogComponent } from './fund-detail-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { Environment } from '../../../../../../../../libs/mint-office/src/lib/core/models/environment.model';
import { HttpClientModule } from '@angular/common/http';

class MockSnackBarService {
    openSnackBar() { /* mock */ }
}

describe('FundDetailDialogComponent', () => {
  let component: FundDetailDialogComponent;
  let fixture: ComponentFixture<FundDetailDialogComponent>;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FundDetailDialogComponent,
     ],
      imports: [
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        MatDividerModule,
        StoreModule.forRoot({}),
        HttpClientModule
      ],
      providers: [
        { provide: 'environment', useValue: environment },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { fundData: {}, investmentEnable: false} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
