import { RiskProfileToRatingPipe } from './risk-profile-to-rating.pipe';

describe('RiskProfileToRatingPipe', () => {
  it('create an instance', () => {
    const pipe = new RiskProfileToRatingPipe();
    expect(pipe).toBeTruthy();
  });

  it('should call transform for Defensive', () => {
    const pipe = new RiskProfileToRatingPipe();
    pipe.transform('Defensive');
    
    expect(pipe.transform('Defensive')).toBe('1');
  });

  it('should call transform for Conservative', () => {
    const pipe = new RiskProfileToRatingPipe();
    pipe.transform('Conservative');

    expect(pipe.transform('Conservative')).toBe('2');
  });

  it('should call transform for Balanced', () => {
    const pipe = new RiskProfileToRatingPipe();
    pipe.transform('Balanced');

    expect(pipe.transform('Balanced')).toBe('3');
  });

  it('should call transform for Growth', () => {
    const pipe = new RiskProfileToRatingPipe();
    pipe.transform('Growth');

    expect(pipe.transform('Growth')).toBe('4');
  });

  it('should call transform for Aggressive', () => {
    const pipe = new RiskProfileToRatingPipe();
    pipe.transform('Aggressive');

    expect(pipe.transform('Aggressive')).toBe('5');
  });
});
