import { RiskProfileToRatingPipe } from './risk-profile-to-rating.pipe';
import { RpPortfolioQuestionOptionBolderPipe } from './rp-portfolio-question-option-bolder.pipe';

export * from './risk-profile-to-rating.pipe';
export * from './rp-portfolio-question-option-bolder.pipe';

export const pipe = [
    RiskProfileToRatingPipe,
    RpPortfolioQuestionOptionBolderPipe
]
