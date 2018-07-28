import { Pipe, PipeTransform } from '@angular/core';
import { Antibiotic } from '../../entities/antibiotic';

/**
 * Filters Antibiotics by the name-field or the given groupName.
 */
@Pipe({
  name: 'filterAntibioticsByNameOrGroupName',
})
export class FilterAntibioticsByNameOrGroupNamePipe implements PipeTransform {

  /**
   * Filters antibiotics by name or group name.
   */
  transform(value: Antibiotic[], searchTerm: string, groupName?: string) {
    if (!searchTerm || searchTerm.length < 1) return value;
    searchTerm = searchTerm.toLowerCase();
    return value.filter((antibiotic) => {
      return antibiotic.name.toLowerCase().startsWith(searchTerm)
        || (groupName && groupName.toLowerCase().startsWith(searchTerm));
    });
  }
}
