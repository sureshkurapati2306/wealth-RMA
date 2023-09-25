import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ErrorInterceptor } from './error.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor
  beforeEach(() => {
      TestBed.configureTestingModule({
            providers: [
                ErrorInterceptor,
                Actions
            ],
            imports: [
                BrowserAnimationsModule,
                RouterTestingModule,
                MatDialogModule,
                StoreModule.forRoot({})
            ]
        });
        interceptor = TestBed.inject(ErrorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should open openSystemErrorDialog', () => {
    const dialogSpy = jest.spyOn(interceptor.dialog, 'open');
    interceptor.openSystemErrorDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });
  
  it('should open openTransactionErrorDialog', () => {
    const dialogSpy = jest.spyOn(interceptor.dialog, 'open');
    interceptor.openTransactionErrorDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });  

});
