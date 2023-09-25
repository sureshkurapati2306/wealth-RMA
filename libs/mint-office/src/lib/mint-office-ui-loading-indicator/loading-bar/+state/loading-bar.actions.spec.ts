import * as fromLoadingBar from './loading-bar.actions';

describe('loadLoadingBars', () => {
  it('should return an action', () => {
    expect(fromLoadingBar.loadingBarShow().type).toBe('[LoadingBar] Show');
  });
});
