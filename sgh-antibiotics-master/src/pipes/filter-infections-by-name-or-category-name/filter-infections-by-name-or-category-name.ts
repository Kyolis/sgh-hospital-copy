import { Pipe, PipeTransform } from '@angular/core';
import { Infection } from '../../entities/infection';

/**
 * Filters Infections by the name field or a given categoryName.
 */
@Pipe({
  name: 'filterInfectionsByNameOrCategoryName',
})
export class FilterInfectionsByNameOrCategoryNamePipe implements PipeTransform {

  /**
   * Filters infections by a name or category.
   */
  transform(infections: Infection[], searchTerm: string, categoryName?: string) {
    if (!searchTerm || searchTerm.length < 1) return infections;
    searchTerm = searchTerm.toLowerCase();
    return infections.filter((infection) => {
      return infection.name.toLowerCase().startsWith(searchTerm)
        || (categoryName && categoryName.toLowerCase().startsWith(searchTerm));
    });
  }
}
