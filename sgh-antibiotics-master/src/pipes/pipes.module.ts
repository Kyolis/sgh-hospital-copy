import { NgModule } from '@angular/core';
import { FilterUsersByEmailPipe } from './filter-users-by-email/filter-users-by-email';
import { FilterAntibioticsByNameOrGroupNamePipe } from './filter-antibiotics-by-name-or-group-name/filter-antibiotics-by-name-or-group-name';
import { FilterAntibioticsByGroupIdPipe } from './filter-antibiotics-by-group-id/filter-antibiotics-by-group-id';
import { FilterHospitalsByNamePipe } from './filter-hospitals-by-name/filter-hospitals-by-name';
import { FilterInfectionsByCategoryIdPipe } from './filter-infections-by-category-id/filter-infections-by-category-id';
import { FilterInfectionsByNameOrCategoryNamePipe } from './filter-infections-by-name-or-category-name/filter-infections-by-name-or-category-name';
import { FilterDosagesByClcrPipe } from './filter-dosages-by-clcr/filter-dosages-by-clcr';

@NgModule({
  declarations: [
    FilterUsersByEmailPipe,
    FilterAntibioticsByNameOrGroupNamePipe,
    FilterAntibioticsByGroupIdPipe,
    FilterHospitalsByNamePipe,
    FilterInfectionsByCategoryIdPipe,
    FilterInfectionsByNameOrCategoryNamePipe,
    FilterDosagesByClcrPipe
  ],
  imports: [],
  exports: [
    FilterUsersByEmailPipe,
    FilterAntibioticsByNameOrGroupNamePipe,
    FilterAntibioticsByGroupIdPipe,
    FilterHospitalsByNamePipe,
    FilterInfectionsByCategoryIdPipe,
    FilterInfectionsByNameOrCategoryNamePipe,
    FilterDosagesByClcrPipe
  ]
})
export class PipesModule {
}
