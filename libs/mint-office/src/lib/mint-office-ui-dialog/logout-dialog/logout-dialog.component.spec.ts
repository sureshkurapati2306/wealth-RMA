import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LogoutDialogComponent } from './logout-dialog.component';

const dialogMock = {
    close: () => { /* mock */ }
};

describe('DialogPromptComponent', () => {
    let component: LogoutDialogComponent;
    let fixture: ComponentFixture<LogoutDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LogoutDialogComponent],
            imports: [
                MatDialogModule,
                MatIconModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: dialogMock },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoutDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dismiss dialog and emit result', () => {
        jest.spyOn(component.dialogRef, 'close').mockReturnValue();
        expect(component.proceed()).toBeUndefined();
    });

    it('should dismiss dialog and emit result', () => {
        jest.spyOn(component.dialogRef, 'close').mockReturnValue();
        expect(component.cancel()).toBeUndefined();
      });
});
