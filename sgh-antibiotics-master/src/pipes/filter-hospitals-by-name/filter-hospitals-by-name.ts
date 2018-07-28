import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Hospital } from '../../entities/hospital';

/**
 * Filters Hospitals by the name field.
 */
@Pipe({
  name: 'filterHospitalsByName',
  pure: true
})
export class FilterHospitalsByNamePipe implements PipeTransform {

  /**
   * Filters hospitals by name.
   */
  transform(hospitalList: Observable<Hospital>, searchTerm: string) {
    if (!hospitalList) return hospitalList;
    searchTerm = searchTerm.toLowerCase();
    return hospitalList.filter((hospital) => {
      return typeof hospital.name !== "undefined" && hospital.name.toLowerCase().startsWith(searchTerm);
    });
  }
}
