import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rpPortfolioQuestionOptionBolder'
})
export class RpPortfolioQuestionOptionBolderPipe implements PipeTransform {

  transform(value: string): string {
    const [portfolio, desc] = value.split(":");
    return (`<b>${portfolio}: </b>${desc}`);
  }

}
