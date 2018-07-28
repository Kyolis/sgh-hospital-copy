import { NgModule } from '@angular/core';
import { AntibioticGroupComponent } from './antibiotic-group/antibiotic-group';
import { IonicPageModule } from 'ionic-angular';
import { AdministrationInfoComponent } from './administration-info/administration-info';
import { EditTextComponent } from './edit-text/edit-text';
import { DosageComponent } from './dosage/dosage';
import { InfectionCategoryComponent } from './infection-category/infection-category';
import { ConditionComponent } from './condition/condition';
import { ManageDosageComponent } from './manage-dosage/manage-dosage';
import { HepaticFailureDosageComponent } from './hepatic-failure-dosage/hepatic-failure-dosage';
import { ManageHepaticFailureDosageComponent } from './manage-hepatic-failure-dosage/manage-hepatic-failure-dosage';
import { UserPopoverComponent } from './user-popover/user-popover';
import { TreatmentComponent } from './treatment/treatment';
import { AntibioticRefManagementComponent } from './antibiotic-ref-management/antibiotic-ref-management';
import { AntibioticRefComponent } from './antibiotic-ref/antibiotic-ref';
import { EditInfectionComponent } from './edit-infection/edit-infection';
import { EditAntibioticComponent } from './edit-antibiotic/edit-antibiotic';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    AntibioticGroupComponent,
    AdministrationInfoComponent,
    EditTextComponent,
    DosageComponent,
    InfectionCategoryComponent,
    ConditionComponent,
    DosageComponent,
    ManageDosageComponent,
    UserPopoverComponent,
    HepaticFailureDosageComponent,
    ManageHepaticFailureDosageComponent,
    TreatmentComponent,
    AntibioticRefManagementComponent,
    AntibioticRefComponent,
    EditInfectionComponent,
    EditAntibioticComponent
  ],
  imports: [
    IonicPageModule,
    PipesModule
  ],
  entryComponents: [
    ManageDosageComponent,
    UserPopoverComponent,
    ManageHepaticFailureDosageComponent,
    AntibioticRefManagementComponent,
    AntibioticRefComponent,
    EditInfectionComponent,
    EditAntibioticComponent
  ],
  exports: [
    AntibioticGroupComponent,
    AdministrationInfoComponent,
    EditTextComponent,
    DosageComponent,
    InfectionCategoryComponent,
    ConditionComponent,
    ManageDosageComponent,
    HepaticFailureDosageComponent,
    ManageHepaticFailureDosageComponent,
    UserPopoverComponent,
    TreatmentComponent,
    AntibioticRefManagementComponent,
    AntibioticRefComponent,
    EditInfectionComponent,
    EditAntibioticComponent
  ]
})
export class ComponentsModule {
}
