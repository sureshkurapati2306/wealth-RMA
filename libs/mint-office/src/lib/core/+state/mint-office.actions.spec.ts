import * as fromMintOffice from './mint-office.actions';

describe('loadMintOffices', () => {
  it('should return an action', () => {
    expect(fromMintOffice.updateCimbFooterClass({className: ''}).type).toBe('[Layout] Update CIMB Footer Class');
  });
});
