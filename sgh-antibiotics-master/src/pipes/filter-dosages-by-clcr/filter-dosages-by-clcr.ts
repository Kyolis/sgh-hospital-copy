import { Pipe, PipeTransform } from '@angular/core';
import { Dosage, DosageType } from '../../entities/dosage';

/**
 * Filters Users by the email field.
 */
@Pipe({
  name: 'filterDosagesByClcr',
  pure: true
})
export class FilterDosagesByClcrPipe implements PipeTransform {

  /**
   * Filter dosages by ClCr values.
   */
  transform(dosages: Dosage[], value: number, showAll: boolean): Dosage[] {
    value = Number(value);
    if (!dosages || showAll) return dosages;
    if (!value) return [];
    return dosages.filter((dosage) => {
      if (dosage.type == DosageType.GREATER) {
        return value > Number(dosage.clcr);
      } else if (dosage.type == DosageType.FROM_TO) {
        return Number(dosage.clcrLow) < value && value <= Number(dosage.clcrHigh);
      } else if (dosage.type == DosageType.LESSER_OR_EQUAL) {
        return value <= Number(dosage.clcr);
      } else {
        throw new Error(`Dosage has illegal type: ${dosage.type}`);
      }
    });
  }
}
