import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'profileToRating'
})

export class RiskProfileToRatingPipe implements PipeTransform {
    transform(value: string): string {
        let riskProfileRating:string = value;

        switch (value) {
            case "Defensive":
                riskProfileRating = "1"
                break;
            case "Conservative":
                riskProfileRating = "2"
                break;
            case "Balanced":
                riskProfileRating = "3"
                break;
            case "Growth":
                riskProfileRating = "4"
                break;
            case "Aggressive":
                riskProfileRating = "5"
                break;
            default:
                break;
        }

        return riskProfileRating;
    }
}
