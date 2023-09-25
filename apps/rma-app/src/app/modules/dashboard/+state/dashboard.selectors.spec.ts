/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IMockState } from './dashboard.models';
import { initialState } from './dashboard.reducer';
import * as Selectors from './dashboard.selectors';

export const dashBoardMockState: IMockState = {
    "monthToDate": [
        {
        "productType": "ASNB",
        "month": 6,
        "year": 2022,
        "totalAmount": 1000,
        "currency": "123",
        "mom": ""
        }
    ],
    "yearToDate": [
    {
        "year": 2022,
        "totalAmount": 7000,
        "currency": "123",
        "lastUpdateAt": "2022-06-02 05:58:37",
        "data": [
            {
            "month": 3,
            "totalAmount": 2000
            },
            {
            "month": 4,
            "totalAmount": 2000
            },
            {
            "month": 5,
            "totalAmount": 2000
            },
            {
            "month": 6,
            "totalAmount": 1000
            }
        ]
    }
    ],
    "rmDetails": {
        "rmId": "1",
        "lanId": "1",
        "name": "string",
        "mobileNumber": "123456789",
        "branch": "1",
        "status": "string",
        "createDate": "string"
    }

}
describe('Dashboard Selectors', () => {
    it('should get current month transaction', () => {
        const result = Selectors.monthToDate.projector({ ...initialState, ...{ transaction: dashBoardMockState} });
        expect(result).toBeTruthy();
    });
    it('should get year transaction', () => {
        const result = Selectors.yearToDate.projector({ ...initialState, ...{ transaction: dashBoardMockState} });
        expect(result).toBeTruthy();
    });

    it('should get Rm details on page load', () => {
        const result = Selectors.getRmDetailsResponse.projector({ ...initialState, ...{ rmDetails: dashBoardMockState.rmDetails } });
        expect(result).toBeTruthy();
    });

});
