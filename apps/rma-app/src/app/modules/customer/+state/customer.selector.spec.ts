import * as CustomerSelector from './customer.selector';

import { customerInitialState, CustomerInvestmentMock, MockGetSettingsParam, MockRiskProfileResponse } from '../mock/customer-state.mock';

describe('Auth Selectors', () => {
    it('should check if we have the responseDTO', () => {
        const result = CustomerSelector.riskProfileResponse.projector({...customerInitialState, riskProfileResponse: MockRiskProfileResponse});

        expect(result).toBeTruthy();
    });

    it('should check if we have the error', () => {
        const result = CustomerSelector.riskProfileError.projector({...customerInitialState, ...{ riskProfileError: "error messages" }});

        expect(result).toEqual("error messages");
    });

    it('should check if we have customer investment', () => {
        const result = CustomerSelector.customerInvestment.projector({...customerInitialState, customerInvestment: CustomerInvestmentMock});

        expect(result).toEqual(CustomerInvestmentMock);
    });

    it('should check if we have settings param', () => {
        const result = CustomerSelector.settingsParam.projector({...customerInitialState, getSettingsParam: MockGetSettingsParam});

        expect(result).toEqual(MockGetSettingsParam);
    });

    it('should check if we have settings param empty', () => {
        const result = CustomerSelector.settingsParam.projector({...customerInitialState, getSettingsParam: []});

        expect(result).toEqual([]);
    });

});
