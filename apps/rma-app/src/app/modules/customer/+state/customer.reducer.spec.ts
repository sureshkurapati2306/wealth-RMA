/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { customerReducer } from "./customer.reducer";
import * as CustomerAction from './customer.action';
import { customerInitialState, CustomerInvestmentMock, MockRiskProfileRequest, MockRiskProfileResponse, MockUpdateCustomerEmail, MockGetSettingsParam } from "../mock/customer-state.mock";
const errorMessage = 'Error Happen!'

describe('Customer Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {};

            const result = customerReducer(customerInitialState, action as any);

            expect(result).toBe(customerInitialState);
        });
    });
});

describe('Customer get profile start', () => {
    it('should start to load data from API', () => {
        const action = CustomerAction.getRiskProfileInquiry({
            data: MockRiskProfileRequest
        });

        const result = customerReducer(customerInitialState, action);

        expect(result.riskProfileRequest).toEqual(MockRiskProfileRequest);
    });
});

describe('Customer risk profile success', () => {
    it('should successfully load data from API', () => {
        const action = CustomerAction.getRiskProfileInqirySuccess({
            data: MockRiskProfileResponse
        });

        const result = customerReducer(customerInitialState, action);

        expect(result.riskProfileResponse).toEqual(MockRiskProfileResponse);
    });
});

describe('Customer risk profile error', () => {
    it('should show error from API', () => {
        const action = CustomerAction.getRiskProfileInqiryFailure({
            data: errorMessage,
        });

        const result = customerReducer(customerInitialState, action);

        expect(result.riskProfileError).toEqual(errorMessage);
    });
});

describe('Customer investment', () => {
    it('should show success from customerInvestment API', () => {
        const action = CustomerAction.coustomerInvestmentSucess({
            data: CustomerInvestmentMock,
        });

        const result = customerReducer(customerInitialState, action);

        expect(result.customerInvestment).toEqual(CustomerInvestmentMock);
    });
});

describe('Update Customer Profile', () => {
    it('should start to load data from API', () => {
        const action = CustomerAction.updateCustomerEmail({
            payload: MockUpdateCustomerEmail
        });

        const result = customerReducer(customerInitialState, action);

        expect(result.updateCustomerEmail).toEqual(MockUpdateCustomerEmail);
    });
});

describe('Get Settings Param', () => {
    it('should load maxUtAcct count', () => {
        const action = CustomerAction.getSettingsParamSuccess({
            data: MockGetSettingsParam
        });

        const result = customerReducer(customerInitialState, action);

        expect(result.getSettingsParam).toEqual(MockGetSettingsParam);
    });
});


