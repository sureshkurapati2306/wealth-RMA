import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AppStatusComponent } from './app-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationStatusTableComponent } from '@cimb/mint-office';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { of } from 'rxjs';

describe('AppStatusComponent', () => {
    let component: AppStatusComponent;
    let fixture: ComponentFixture<AppStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppStatusComponent, ApplicationStatusTableComponent],
            imports: [
                RouterTestingModule,
                CommonModule,
                MatDialogModule,
                FormsModule,
                ReactiveFormsModule,
                MatCardModule,
                MatButtonModule,
                MatFormFieldModule,
                MatSelectModule,
                MatIconModule,
                MatDialogModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({})
            ],
            providers: [
               TransactionService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppStatusComponent);
        component = fixture.componentInstance;
        component.getRmResponse$ = of({rmId: "123",branch: "", createDate: "",lanId: "", mobileNumber: "",name: "", status: ""})
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
