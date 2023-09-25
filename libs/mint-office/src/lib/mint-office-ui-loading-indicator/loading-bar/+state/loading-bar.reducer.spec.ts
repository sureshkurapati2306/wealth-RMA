/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { reducer, initialState } from './loading-bar.reducer';
import * as Actions from './loading-bar.actions';

describe('LoadingBar Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {};

      const result = reducer(initialState, action as any);

      expect(result).toBe(initialState);
    });
  });
});

describe('loadingBarShow action', () => {
  it('should set visibility to visible', () => {
    const action = Actions.loadingBarShow();

    const result = reducer(initialState, action);

    expect(result.visibility).toEqual('visible');
  });
});

describe('loadingBarHide action', () => {
  it('should set visibility to hidden', () => {
    const action = Actions.loadingBarHide();

    const result = reducer(initialState, action);

    expect(result.visibility).toEqual('hidden');
  });
});
