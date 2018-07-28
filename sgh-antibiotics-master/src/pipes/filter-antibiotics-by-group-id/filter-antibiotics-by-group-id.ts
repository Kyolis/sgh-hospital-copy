import { Pipe, PipeTransform } from '@angular/core';
import { Antibiotic } from '../../entities/antibiotic';

/**
 * Filters Antibiotics by the groupId field.
 */
@Pipe({
  name: 'filterAntibioticsByGroupId',
})
export class FilterAntibioticsByGroupIdPipe implements PipeTransform {

  /**
   * Filters an Antibiotic[] according to a groupId.
   */
  transform(antibioticList: Antibiotic[], groupId?: string) {
    if (!antibioticList) return antibioticList;
    return antibioticList.filter(item => item.groupId == groupId);
  }
}
