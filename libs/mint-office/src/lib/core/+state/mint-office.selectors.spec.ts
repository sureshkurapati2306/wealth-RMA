import * as fromMintOffice from './mint-office.reducer';
import * as Selectors from './mint-office.selectors';
import { selectMintOfficeState } from './mint-office.selectors';
import { MockCustomerProfile, mockCustomerResponse } from '../mock/data/customer-mock-data';

describe('MintOffice Selectors', () => {
  
  it('should select the feature state', () => {
    const result = selectMintOfficeState({
      [fromMintOffice.mintOfficeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select the footer class name', () => {
    const result = Selectors.getCimbFooterClassName.projector(fromMintOffice.initialState);

    expect(result).toEqual('');
  });

  it('should check if customer selected', () => {

    const result = Selectors.customer.projector({...fromMintOffice.initialState, customer: mockCustomerResponse});

    expect(result).toEqual(mockCustomerResponse);
});

it('should check if cifNumber exist', () => {

  const result = Selectors.cifNumber.projector({...fromMintOffice.initialState, cifNumber: "12345"});

  expect(result).toEqual('12345');
});

it('should get customer profile', () => {
  const result = Selectors.customerProfile.projector({...fromMintOffice.initialState, customerProfile: MockCustomerProfile });

  expect(result).toEqual(MockCustomerProfile);
})

});
