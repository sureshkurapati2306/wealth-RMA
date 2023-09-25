import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { Environment } from '../models/environment.model';

import { AuthService } from './auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


const notFoundErrMsg = 'Mock 404 error';
const mockData = {
  "grantType": "refresh_token",
  "token": "test1",
}

const logoutData = {
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0YTg4ZDEzMC02ODBlLTQxNjMtOTRlMS05NjdkOTJmMTg2MzgifQ.eyJqdGkiOiI1NTcxN2I0NS0wYjhmLTRiMjgtODljNS0zOGY2YTIyYjIxYzMiLCJleHAiOjE2NDgxOTQyMTMsIm5iZiI6MCwiaWF0IjoxNjQ4MTkyNDEzLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmFwcHMudGNqdGVhbS50ZWNoL2F1dGgvcmVhbG1zL3dlYWx0aCIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuYXBwcy50Y2p0ZWFtLnRlY2gvYXV0aC9yZWFsbXMvd2VhbHRoIiwic3ViIjoiYTk0MzNhYjctYzZmMy00M2U2LTg5OTUtYTk3NWU1MTI0ZTU1IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6IndlYWx0aC1hcHAiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJjY2ZlNzk1Yy0xNjg1LTQxNTgtODcwNy01NjhjYTNkMWM5NTkiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBfaWQgcHJvZmlsZSBlbWFpbCJ9.LIlVu_amOeKeZBalHenTumKkvgY2H2yEl_e8H_DYI5c"
}
describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: 'environment', useValue: environment
        }
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login() success path', (done) => {

    jest.spyOn(httpClient, 'post').mockReturnValue(of(
      {
        "grantType": "refresh_token",
        "token": "test1",
      }
    ));

    service.login(mockData).subscribe(data =>{
      console.log('data ', data);
      expect(data).toEqual(mockData);
      done();
    });

  });

  it('should call login() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: notFoundErrMsg,
      status: 404
    });

    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

    service.login(mockData)
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });

  it('should call logout() success path', (done) => {

    jest.spyOn(httpClient, 'post').mockReturnValue(of(
      logoutData
    ));

    service.logout(logoutData).subscribe(data =>{
      expect(data).toEqual(logoutData);
      done();
    });

  });
  it('should call logout() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: notFoundErrMsg,
      status: 404
    });

    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

    service.logout(logoutData)
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(notFoundErrMsg);
          expect(error.status).toBe(404);
          done();
        });
  });

  test('should have save the setUserDataInSessionStorage', () => {
    window.sessionStorage.setItem('access_token', 'test')

    expect(sessionStorage.getItem('access_token')).toEqual('test');
    expect(sessionStorage.length).toBeTruthy();
  });

});
