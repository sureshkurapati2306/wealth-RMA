import { RpPortfolioQuestionOptionBolderPipe } from './rp-portfolio-question-option-bolder.pipe';

describe('RpPortfolioQuestionOptionBolderPipe', () => {
  it('create an instance', () => {
    const pipe = new RpPortfolioQuestionOptionBolderPipe();
    expect(pipe).toBeTruthy();
  });

  it('should call transform', () => {
    const pipe = new RpPortfolioQuestionOptionBolderPipe();
    pipe.transform('question1')
    expect(pipe).toBeTruthy();
  });
});
