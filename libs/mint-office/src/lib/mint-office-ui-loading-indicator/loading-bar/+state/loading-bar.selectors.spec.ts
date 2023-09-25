import * as fromLoadingBar from './loading-bar.reducer';
import { selectLoadingBarState } from './loading-bar.selectors';

describe('LoadingBar Selectors', () => {
  it('should select the feature state', () => {
    const result = selectLoadingBarState({
      [fromLoadingBar.loadingBarFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
