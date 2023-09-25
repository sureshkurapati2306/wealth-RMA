/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './components/chart/chart.component';

import { DashboardComponent } from './dashboard.component';
import { StoreModule } from '@ngrx/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { dashBoardMockState } from './+state/dashboard.selectors.spec';
import { of } from 'rxjs';
import { Environment, ApplicationStatusTableComponent } from '@cimb/mint-office';
import { TransactionService } from '../transaction/services/transaction.service';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    const dialogeMock = {
        open: () => { /* mock */ }
    }

    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatAutocompleteModule,
                MatCardModule,
                MatIconModule,
                GoogleChartsModule,
                MatPaginatorModule,
                FormsModule,
                MatDialogModule,
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule,
                StoreModule.forRoot({})
            ],
            declarations: [
                DashboardComponent,
                ChartComponent,
                ApplicationStatusTableComponent
            ],
            providers: [
                TransactionService,
                { provide: 'environment', useValue: environment },
                {
                    provide: MatDialog,
                    useValue: dialogeMock,
                },

            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        component.rmDetails$ = of(dashBoardMockState.rmDetails)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call popstate', () => {
        const event = window.dispatchEvent(new Event('popstate'));
        component.unloadNotification({} as PopStateEvent);
      });
});
