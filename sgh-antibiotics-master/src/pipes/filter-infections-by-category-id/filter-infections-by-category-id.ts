import { Pipe, PipeTransform } from '@angular/core';
import { Infection } from '../../entities/infection';

/**
 * Filters Infections by the categoryId field.
 */
@Pipe({
  name: 'filterInfectionsByCategoryId',
})
export class FilterInfectionsByCategoryIdPipe implements PipeTransform {

  /**
   * Filters an Infection[] according to a categoryId.
   */
  transform(infections: Infection[], categoryId?: string) {
    if (!infections) return infections;
    return infections.filter(item => item.categoryId == categoryId);
  }
}
