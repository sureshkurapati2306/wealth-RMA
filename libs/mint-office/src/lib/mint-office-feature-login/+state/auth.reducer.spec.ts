/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { authReducer, initialState, State } from '../+state/auth.reducer';
import * as Actions from '../+state/auth.actions';
import { authData, logout } from '../../core/models/auth.model';

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNNXVnMDhRQXR4QktCVXNOUHJHa1FVVnVfRE9LS2k4NC02ZW1adnpHbTV3In0.eyJqdGkiOiJkMzQ4ZDY4Mi04NTYzLTQ0MjItODkwZS1jODY4YjlmMTIyNDQiLCJleHAiOjE2NDgxOTI3MTMsIm5iZiI6MCwiaWF0IjoxNjQ4MTkyNDEzLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmFwcHMudGNqdGVhbS50ZWNoL2F1dGgvcmVhbG1zL3dlYWx0aCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhOTQzM2FiNy1jNmYzLTQzZTYtODk5NS1hOTc1ZTUxMjRlNTUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3ZWFsdGgtYXBwIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2NmZTc5NWMtMTY4NS00MTU4LTg3MDctNTY4Y2EzZDFjOTU5IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJncm91cF9pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJncm91cElkIjpbIi9jdXN0b21lcl9zdXBwb3J0Il0sInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QxIn0.mRt2K6Mo9r3tP-p-rwsQtb-B2d1Fb2y9_fMESpA93PHJe47Ue9kJ-BkOxcrIzdCoAJ8WUlwA4OJu7nXt1Uzx45xfnkeIehBnw-k7yEnq1h3uk9VBFYrJRdOHRHtvl27g9v7IkQ2RBUmo0J5JltYa5fepzRSgFr78gq5m22dgkahdhhxnlScQftq7yRFXWmhS0JRRjdZHY_bbS6Vq3cdlUWmdSnkfHshILzbVxXwSAbv4mUkcVgoHHznmgMa_qXaKd4lartDLhRC-Gs_v6xFns3G4w02n6m6uNiiZgbTnQku_8vU4Bh8g-5tkNWo-FZ6N83MabcFM0Lhq-YclFnvdFg";
const error = "The error message";
const mockData: State = {
    authData: {
      "access_token": token,
      "expires_in": new Date(300).toISOString(),
      "refresh_token": token,
      "refresh_expires_in": new Date(1800).toISOString(),
      "token_type": "Bearer"
    },
    logout: {
        "refresh_token": token
    },
    loggedIn: false,
    errorMessage: ''
}
describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {};

      const result = authReducer(initialState, action as any);

      expect(result).toBe(initialState);
    });
  });
});

describe('Auth action', () => {
  it('should start to load data from API', () => {
    const action = Actions.authStart({
      data: {
        grantType: 'refresh_token',
        token: 'testtoken'
      }
    });

    const result = authReducer(initialState, action);

    expect(result.loggedIn).toEqual(false);
  });
});

describe('Auth Success action', () => {
  it('should successfully load data from API', () => {
    const action = Actions.loginSuccess({
      authData: mockData.authData ? mockData.authData : {} as authData
    });

    const result = authReducer(initialState, action);

    expect(result.loggedIn).toEqual(true);
    expect(result.authData).toEqual(mockData.authData);

  });
});

describe('Auth Failure action', () => {
  it('should failed to load data from API', () => {
    const action = Actions.loginFailure({
      error: error
    });

    const result = authReducer(initialState, action);

    expect(result.loggedIn).toEqual(false);
    expect(result.errorMessage).toEqual(error);

  });
});

describe('Refresh Auth action', () => {
  it('should start to load data from API', () => {
    const action = Actions.refreshAuth({
      data: {
        auth: {
          "grantType": "refresh_token",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0YTg4ZDEzMC02ODBlLTQxNjMtOTRlMS05NjdkOTJmMTg2MzgifQ.eyJqdGkiOiI1NTcxN2I0NS0wYjhmLTRiMjgtODljNS0zOGY2YTIyYjIxYzMiLCJleHAiOjE2NDgxOTQyMTMsIm5iZiI6MCwiaWF0IjoxNjQ4MTkyNDEzLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmFwcHMudGNqdGVhbS50ZWNoL2F1dGgvcmVhbG1zL3dlYWx0aCIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuYXBwcy50Y2p0ZWFtLnRlY2gvYXV0aC9yZWFsbXMvd2VhbHRoIiwic3ViIjoiYTk0MzNhYjctYzZmMy00M2U2LTg5OTUtYTk3NWU1MTI0ZTU1IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6IndlYWx0aC1hcHAiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJjY2ZlNzk1Yy0xNjg1LTQxNTgtODcwNy01NjhjYTNkMWM5NTkiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBfaWQgcHJvZmlsZSBlbWFpbCJ9.LIlVu_amOeKeZBalHenTumKkvgY2H2yEl_e8H_DYI5c"
        },
        expires_in: '300'
      }
    });

    const result = authReducer(initialState, action);

    expect(result.loggedIn).toEqual(true);
  });
});

describe('Logout action', () => {
  it('should do a logout', () => {
    const action = Actions.loadLogout({
      logout: mockData.logout ? mockData.logout : {} as logout
    });

    const result = authReducer(initialState, action);

    expect(result.logout).toEqual(mockData.logout);

  });
});

describe('Logout action success', () => {
  it('should do a logout action', () => {
    const action = Actions.loadLogoutSuccess({
      logout: mockData.logout ? mockData.logout : {} as logout
    });

    const result = authReducer(initialState, action);

    expect(result.logout).toEqual(null);

  });
});

describe('Logout action failure', () => {
  it('should failed logout', () => {
    const action = Actions.loadLogoutFailure({
      error: error
    });

    const result = authReducer(initialState, action);
    expect(result.errorMessage).toEqual("");

  });
});
