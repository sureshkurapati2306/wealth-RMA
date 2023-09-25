import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthTokenInterceptor } from './auth-token.interceptor';

describe('AuthTokenInterceptor', () => {
  let interceptor: AuthTokenInterceptor
  beforeEach(() => {
      TestBed.configureTestingModule({
            providers: [
                AuthTokenInterceptor,
                Actions
            ],
            imports: [
                StoreModule.forRoot({})
            ]
        });
        interceptor = TestBed.inject(AuthTokenInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

});
