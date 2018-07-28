import { Component, ViewChild } from '@angular/core';
import { ModalController, Nav, Platform, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserSettingsPage } from '../pages/user-settings/user-settings';
import { UserManagementPage } from '../pages/user-management/user-management';
import { AntibioticsOverviewPage } from '../pages/antibiotics-overview/antibiotics-overview';
import { WizardPage } from '../pages/wizard/wizard';
import { Session, SessionServiceProvider } from '../providers/session-service/session-service';
import { CalculatorPage } from '../pages/calculator/calculator';
import { GuidelinesPage } from '../pages/guidelines/guidelines';
import { HospitalManagementPage } from '../pages/hospital-management/hospital-management';
import { InfectionsOverviewPage } from '../pages/infections-overview/infections-overview';
import { UserPopoverComponent } from '../components/user-popover/user-popover';
//import { GuideServiceProvider } from '../providers/guide-service/guide-service';
import { Guides } from '../entities/guides';
import { UserGuidePage } from '../pages/user-guide/user-guide';
import { Subscription } from 'rxjs/Subscription';
import { AboutPage } from '../pages/about/about';
import { AdminGuidePage } from '../pages/admin-guide/admin-guide';

/**
 * Staring-Point of the App. Gets loaded first.
 */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AntibioticsOverviewPage;

  pages: Array<{ title: string, component: any }>;
  adminFunctions: Array<{ title: string, component: any }>;
  regularFuncions: Array<{ title: string, component: any }>;
  settings: Array<{ title: string, component: any }>;

  adminGuide: Guides;
  userGuide: Guides;

  session: Session;
  private userGuidesSubscription: Subscription;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public sessionService: SessionServiceProvider,
              private popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              ) {
    this.initializeApp();

    this.regularFuncions = [
      {title: 'Antimicrobials', component: AntibioticsOverviewPage},
      {title: 'Infections', component: InfectionsOverviewPage},
      {title: 'Calculator', component: CalculatorPage},
      {title: 'Guidelines', component: GuidelinesPage}
    ];

    this.adminFunctions = [
      {title: 'User Management', component: UserManagementPage},
      {title: 'Hospital Management', component: HospitalManagementPage}
    ];

    this.settings = [
      {title: 'Settings', component: UserSettingsPage},
    ];

    this.session = new Session();

    /**
     * Get session state and set rootPage.
     */
    this.sessionService.state.subscribe(session => {
      this.session = session;
      if (!session.loggedIn) {
        if (this.userGuidesSubscription)
          this.userGuidesSubscription.unsubscribe();

        this.rootPage = WizardPage;
        this.nav.setRoot(this.rootPage);
      } else {
        this.rootPage = AntibioticsOverviewPage;
        /*this.userGuidesSubscription = this.guideService.guides.subscribe(guides => {
          guides.forEach(guide => {
            if (guide.name === "Admin Guide") {
              this.adminGuide = guide;
            } else if (guide.name == "User Guide") {
              this.userGuide = guide;
            }
          });
        });*/
      }
    });


  }

  /**
   * To run the application.
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
    });
  }

  /**
   * To open page selected.
   * @param page  Page selected.
   */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  /**
   * To open pop over.
   * @param myEvent  MouseEvent.
   */
  presentUserPopover(myEvent) {
    let popover = this.popoverCtrl.create(UserPopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  showAbout() {
    let modal = this.modalCtrl.create(AboutPage);
    modal.present();
  }

  showAdminGuide() {
    let modal = this.modalCtrl.create(AdminGuidePage);
    modal.present();
  }

  showUserGuide() {
    let modal = this.modalCtrl.create(UserGuidePage);
    modal.present();
  }

}
