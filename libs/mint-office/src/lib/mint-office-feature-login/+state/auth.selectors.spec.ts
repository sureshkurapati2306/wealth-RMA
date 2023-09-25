import * as Selectors from './auth.selectors';
import * as authReducer from './auth.reducer';

const mockState: authReducer.State = {
    authData: {
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNNXVnMDhRQXR4QktCVXNOUHJHa1FVVnVfRE9LS2k4NC02ZW1adnpHbTV3In0.eyJqdGkiOiJkMzQ4ZDY4Mi04NTYzLTQ0MjItODkwZS1jODY4YjlmMTIyNDQiLCJleHAiOjE2NDgxOTI3MTMsIm5iZiI6MCwiaWF0IjoxNjQ4MTkyNDEzLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmFwcHMudGNqdGVhbS50ZWNoL2F1dGgvcmVhbG1zL3dlYWx0aCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhOTQzM2FiNy1jNmYzLTQzZTYtODk5NS1hOTc1ZTUxMjRlNTUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3ZWFsdGgtYXBwIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2NmZTc5NWMtMTY4NS00MTU4LTg3MDctNTY4Y2EzZDFjOTU5IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJncm91cF9pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJncm91cElkIjpbIi9jdXN0b21lcl9zdXBwb3J0Il0sInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QxIn0.mRt2K6Mo9r3tP-p-rwsQtb-B2d1Fb2y9_fMESpA93PHJe47Ue9kJ-BkOxcrIzdCoAJ8WUlwA4OJu7nXt1Uzx45xfnkeIehBnw-k7yEnq1h3uk9VBFYrJRdOHRHtvl27g9v7IkQ2RBUmo0J5JltYa5fepzRSgFr78gq5m22dgkahdhhxnlScQftq7yRFXWmhS0JRRjdZHY_bbS6Vq3cdlUWmdSnkfHshILzbVxXwSAbv4mUkcVgoHHznmgMa_qXaKd4lartDLhRC-Gs_v6xFns3G4w02n6m6uNiiZgbTnQku_8vU4Bh8g-5tkNWo-FZ6N83MabcFM0Lhq-YclFnvdFg",
        "expires_in": new Date(300).toISOString(),
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0YTg4ZDEzMC02ODBlLTQxNjMtOTRlMS05NjdkOTJmMTg2MzgifQ.eyJqdGkiOiI1NTcxN2I0NS0wYjhmLTRiMjgtODljNS0zOGY2YTIyYjIxYzMiLCJleHAiOjE2NDgxOTQyMTMsIm5iZiI6MCwiaWF0IjoxNjQ4MTkyNDEzLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmFwcHMudGNqdGVhbS50ZWNoL2F1dGgvcmVhbG1zL3dlYWx0aCIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuYXBwcy50Y2p0ZWFtLnRlY2gvYXV0aC9yZWFsbXMvd2VhbHRoIiwic3ViIjoiYTk0MzNhYjctYzZmMy00M2U2LTg5OTUtYTk3NWU1MTI0ZTU1IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6IndlYWx0aC1hcHAiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJjY2ZlNzk1Yy0xNjg1LTQxNTgtODcwNy01NjhjYTNkMWM5NTkiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBfaWQgcHJvZmlsZSBlbWFpbCJ9.LIlVu_amOeKeZBalHenTumKkvgY2H2yEl_e8H_DYI5c",
        "refresh_expires_in": new Date(1800).toISOString(),
        "token_type": "Bearer"
    },
    logout: {
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0YTg4ZDEzMC02ODBlLTQxNjMtOTRlMS05NjdkOTJmMTg2MzgifQ.eyJqdGkiOiI1NTcxN2I0NS0wYjhmLTRiMjgtODljNS0zOGY2YTIyYjIxYzMiLCJleHAiOjE2NDgxOTQyMTMsIm5iZiI6MCwiaWF0IjoxNjQ4MTkyNDEzLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmFwcHMudGNqdGVhbS50ZWNoL2F1dGgvcmVhbG1zL3dlYWx0aCIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuYXBwcy50Y2p0ZWFtLnRlY2gvYXV0aC9yZWFsbXMvd2VhbHRoIiwic3ViIjoiYTk0MzNhYjctYzZmMy00M2U2LTg5OTUtYTk3NWU1MTI0ZTU1IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6IndlYWx0aC1hcHAiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJjY2ZlNzk1Yy0xNjg1LTQxNTgtODcwNy01NjhjYTNkMWM5NTkiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ3JvdXBfaWQgcHJvZmlsZSBlbWFpbCJ9.LIlVu_amOeKeZBalHenTumKkvgY2H2yEl_e8H_DYI5c"
    },
    loggedIn: true,
    errorMessage: 'Error'
}
describe('Auth Selectors', () => {
    it('should check if user is authenticated', () => {
        const result = Selectors.isAuthenticated.projector(mockState);

        expect(result).toBeTruthy();
    });

    it('should get an access token if user is authenticated', () => {
        const result = Selectors.getToken.projector(mockState);

        expect(result).toBeTruthy();
    });

    it('should get user detail if user is authenticated', () => {
        const result = Selectors.getUserDetail.projector(mockState);
    
        expect(result).toBeTruthy();
    });

    it('should get user group name if user is authenticated', () => {
        const result = Selectors.getGroupName.projector(mockState);

        expect(result).toBeTruthy();
    });

    it('should throw an error message', () => {
        const result = Selectors.getErrorMessage.projector(mockState.errorMessage);

        expect(result).toBeUndefined();
    });
});
