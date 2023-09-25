/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { reducer, initialState } from './mint-office.reducer';
import * as Actions from './mint-office.actions';
import { MockCustomerProfile, mockCustomerResponse } from '../mock/data/customer-mock-data';

describe('MintOffice Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {};

            const result = reducer(initialState, action as any);

            expect(result).toBe(initialState);
        });
    });

    describe('updateCimbFooterClass action', () => {
        it('should update the cimb footer class', () => {
            const action = Actions.updateCimbFooterClass({
                className: 'myClass'
            });

            const result = reducer(initialState, action);

            expect(result.cimbFooterClass).toEqual('myClass');
        });

        it('should set customer data', () => {
            const action = Actions.customer({
                data: mockCustomerResponse
            })

            const result = reducer(initialState, action);

            expect(result.customer).toEqual(mockCustomerResponse);
        });

        it('should set cifNumber data', () => {
            const action = Actions.getCoustomer({
                cifNumber: '12345'
            })

            const result = reducer(initialState, action);

            expect(result.cifNumber).toEqual('12345');
        });

        it('should successfully load customer profile from API', () => {
            const action = Actions.customerProfile({
                data: MockCustomerProfile
            });

            const result = reducer(initialState, action);

            expect(result.customerProfile).toEqual(MockCustomerProfile);
        });

        it('should successfully reset the ', () => {
            const action = Actions.resetCustomerState();
            const result = reducer(initialState, action);
            expect(result).toEqual(initialState);
        });

    });

});
