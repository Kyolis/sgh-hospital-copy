import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UserManagementPageModule } from '../pages/user-management/user-management.module';
import { SessionServiceProvider } from '../providers/session-service/session-service';
import { AntibioticsOverviewPageModule } from '../pages/antibiotics-overview/antibiotics-overview.module';
import { WizardPageModule } from '../pages/wizard/wizard.module';
import { UserSettingsPageModule } from '../pages/user-settings/user-setings.module';
import { CalculatorPageModule } from '../pages/calculator/calculator.module';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { HospitalProvider } from '../providers/hospital/hospital';
import { GuidelinesPageModule } from '../pages/guidelines/guidelines.module';
import { GuidelinesDetailsPageModule } from '../pages/guidelines-details/guidelines-details.module';
import { HospitalManagementPageModule } from '../pages/hospital-management/hospital-management.module';
import { HospitalDetailsPageModule } from '../pages/hospital-details/hospital-details.module';
import { MonitoringParameters } from '../pages/monitoring-parameters/monitoring-parameters';
import { MonitoringParametersPageModule } from '../pages/monitoring-parameters/monitoring-parameters.module';
import { MarkdownModalInfoPageModule } from '../pages/markdown-modal-info/markdown-modal-info.module';
import { InfectionProvider } from '../providers/infection/infection';
import { InfectionsOverviewPageModule } from '../pages/infections-overview/infections-overview.module';
import { AdverseReactionsPageModule } from '../pages/adverse-reactions/adverse-reactions.module';
import { AdverseReactionsPage } from '../pages/adverse-reactions/adverse-reactions';
import { GuideServiceProvider } from '../providers/guide-service/guide-service';
import { UserGuidePageModule } from '../pages/user-guide/user-guide.module';
import { AdminInfoTreatmentServiceProvider } from '../providers/admin-info-treatment-service/admin-info-treatment-service';
import { AntibioticProvider } from '../providers/antibiotic/antibiotic';
import { GuidelineProvider } from '../providers/guideline/guideline';
import { AboutProvider } from '../providers/about/about';
import { AboutPageModule } from '../pages/about/about.module';
import { AdminGuidePageModule } from '../pages/admin-guide/admin-guide.module';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    AboutPageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    UserManagementPageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    UserSettingsPageModule,
    AntibioticsOverviewPageModule,
    WizardPageModule,
    CalculatorPageModule,
    GuidelinesPageModule,
    GuidelinesDetailsPageModule,
    MarkdownModalInfoPageModule,
    MonitoringParametersPageModule,
    AdverseReactionsPageModule,
    HospitalManagementPageModule,
    HospitalDetailsPageModule,
    InfectionsOverviewPageModule,
    UserGuidePageModule,
    AdminGuidePageModule,
    AngularFirestoreModule.enablePersistence() // used for offline storage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MonitoringParameters,
    AdverseReactionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionServiceProvider,
    UserServiceProvider,
    HospitalProvider,
    InfectionProvider,
    GuideServiceProvider,
    AdminInfoTreatmentServiceProvider,
    AntibioticProvider,
    GuidelineProvider,
    AboutProvider,
    Network
  ]
})
export class AppModule {}
