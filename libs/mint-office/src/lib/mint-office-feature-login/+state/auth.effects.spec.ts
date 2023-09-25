import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { asyncScheduler, Observable, of, throwError, timer } from 'rxjs';
import { Environment } from '../../core/models/environment.model';
import { AuthService } from '../../core/services/auth.service';

import { AuthEffects } from './auth.effects';

import * as authReducer from './auth.reducer';

import * as Actions from '../+state/auth.actions';
import { authData } from '../../core/models/auth.model';
import { tap } from 'rxjs/operators';

class mockAuthService {
  login() { /* mock */ }
  refresh() { /* mock */ }
  logout() {/*mock*/}
  setUserDataInSessionStorage() {/*mock*/}
}

const errorMsg = 'Mock error';

const mockRefreshData: authData = {
    access_token: "string",
    expires_in: "string",
    refresh_token: "string",
    refresh_expires_in: "string",
    token_type: "string",
}

const mockLogout = {
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0YTg4ZDEzMC02ODBlLTQxNjMtOTRlMS05NjdkOTJmMTg2MzgifQ.eyJqdGkiOiI1NTcxN2I0NS0wYjhmLTRiMjgtODljNS0zOGY2YTIyYjIxYzMiLCJleHAiOjE2NDgxOTQyMTMsIm5iZiI6MCwiaWF0IjoxNjQ4MTkyNDEzLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmFwcHMudGNqdGVhbS50ZWNoL2F1dGgvcmVhbG1zL3dlYWx0aCIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuYXBwcy50Y2p0ZWFtLnRlY2gvYXV0aC9yZWFsbXMvd2VhbHRoIiwic3ViIjoiYTk0MzNhYjctYzZmMy00M2U2LTg5OTUtYTk3NWU1MTI0ZTU1IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6IndlYWx0aC1hcHAiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJjY2ZlNzk1Yy0xNjg1LTQxNTgtODcwNy01NjhjYTNkMWM5NTkiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBfaWQgcHJvZmlsZSBlbWFpbCJ9.LIlVu_amOeKeZBalHenTumKkvgY2H2yEl_e8H_DYI5c",
    "isInactive": false,
    "success": false
  }

const mockState: authReducer.State = {
  authData:null,
  loggedIn: true,
  logout: null,
  errorMessage: ''
}

describe('AuthEffects', () => {
    let actions: Observable<Action>;
    let effects: AuthEffects;
    let authService: AuthService;
    let tick: (milliseconds: number) => void;

    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
              AuthEffects,
              provideMockActions(() => actions),
              provideMockStore({ initialState: mockState }),
              { provide: 'environment', useValue: environment},
              {
                provide: AuthService, useClass: mockAuthService
              },
           ],
        });

        effects = TestBed.inject(AuthEffects);
        authService = TestBed.inject(AuthService);
    });


    beforeEach(() => {
      let fakeNow = 0;
      tick = milliseconds => {
        fakeNow += milliseconds;
        tick(milliseconds);
      };
      asyncScheduler.now = () => fakeNow;
    });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should do a success login', (done) => {
    const spy = jest.spyOn(authService, 'login').mockReturnValue(of(mockRefreshData));

    actions = of(Actions.authStart({
      data: {
        "grantType": "refresh_token",
        "token": 'testtoken'
      }
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.login$
      .subscribe(action => {
        expect(action).toEqual(Actions.loginSuccess({
          authData: mockRefreshData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });


  it('should do a success refresh', fakeAsync(() => {
    const source = timer(300 * 100);
    let received: number | undefined;

    actions = of(Actions.authStart({
      data: {
        "grantType": "refresh_token",
        "token": 'testtoken'
      }
    }));

    source.pipe(
      tap(() => {
        expect(actions).toEqual(Actions.loginSuccess({
          authData: mockRefreshData
        }));
        tick(30000);
        expect(received).toBe(0)
      }))

  }));

  it('should do a failure login', (done) => {

    const spy = jest.spyOn(authService, 'login').mockReturnValue(throwError({message: errorMsg}));

    // create an actions stream and immediately dispatch a POST action
    actions = of(Actions.authStart({
      data: {
        "grantType": "refresh_token",
        "token": 'testtoken'
      }
    }));

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.login$
      .subscribe(action => {
        expect(action).toEqual(Actions.loginFailure({
          error: errorMsg
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });

  });

  it('should do a success logout', (done) => {
    const spy = jest.spyOn(authService, 'logout').mockReturnValue(of(mockLogout));

    actions = of(Actions.loadLogout({
      logout: mockLogout
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.logout$
      .subscribe(() => {
        expect(window.sessionStorage.clear()).toBeUndefined();
        expect(window.sessionStorage.getItem('refresh_token')).toBeFalsy();
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });


  it('should do a failure logout', (done) => {

    const spy = jest.spyOn(authService, 'logout').mockReturnValue(throwError({message: errorMsg}));

    // create an actions stream and immediately dispatch a POST action
    actions = of(Actions.loadLogout({
      logout: mockLogout
    }));


    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.logout$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadLogoutFailure({
          error: errorMsg
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });

  });
});
