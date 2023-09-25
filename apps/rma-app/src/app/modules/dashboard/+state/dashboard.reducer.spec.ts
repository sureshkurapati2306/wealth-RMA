/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { transactionReducer ,initialState } from './dashboard.reducer';
import * as Actions from './dashboard.actions';
import { IRmDetails } from './dashboard.models';

const rmDetailsMockData: IRmDetails = {
      "rmId": "1",
      "lanId": "1",
      "name": "string",
      "mobileNumber": "123456789",
      "branch": "1",
      "status": "string",
      "createDate": "string"
}
describe('Dashboard Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {};

      const result = transactionReducer(initialState, action as any);

      expect(result).toBe(initialState);
    });
  });
});

describe('RmDetails Success action', () => {
  it('should successfully load data from API', () => {
    const action = Actions.getRmDetailSuccess({
      rmDetail: rmDetailsMockData
    });

    const result = transactionReducer(initialState, action);

    expect(result).toBeTruthy();
  });
});

