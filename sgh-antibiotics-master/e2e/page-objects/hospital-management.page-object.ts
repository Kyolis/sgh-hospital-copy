import { browser, element, by, ElementFinder } from 'protractor';

export class HospitalManagementPageObject{
  browseToPage(){

    browser.get('');
    browser.driver.sleep(500);
    //browser.manage().window().maximize();

  }

  getHospital() {
    // clicks on ion-select
    //return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/ion-list/ion-item/div[1]/div/ion-select'));
    //clicks on list
    return element(by.xpath('//*[@id="select-1-0"]/span'));

  }

  getLoginEmailInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/div/form/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getLoginPasswordInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/div/form/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getLoginButton(){
    return element(by.buttonText('Login'));
  }

  getMenu(){
    return element(by.className('bar-buttons bar-buttons-md bar-button bar-button-md bar-button-default bar-button-default-md bar-button-menutoggle bar-button-menutoggle-md'));
  }

  getHospitalManagementPage(){
    return element(by.buttonText('Hospital Management'));
  }

  getSettings(){
    return element(by.xpath('//*[@id="settings"]/button'));
  }

  getHospitalDropdown(){
    return element(by.className('item-cover item-cover-md item-cover-default item-cover-default-md'));
  }

  getSearchBar(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-management/ion-content/div[2]/ion-searchbar/div/input'));
  }

  getSoftwareTestingHospital(){
    return element(by.cssContainingText('.list.list-md','SoftwareTesting'));
  }

  getFirstSearched(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-management/ion-content/div[2]/ion-list/ion-item/div[1]/div/ion-label/span'));
  }

  getResultSearchTitle(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-details/ion-header/ion-navbar/div[2]/ion-title/div'));
  }

  getAddHospitalButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-management/ion-content/div[2]/ion-list/button/div[1]/div'));
  }

  getAddHospitalInput(){
    return element(by.className('alert-input ng-pristine ng-valid ng-touched'));
  }

  getSAVE(){
    return element(by.buttonText('Save'));
  }

  getAlertTitle(){
    return element(by.className('alert-title'));
  }

  getTestHospital(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-management/ion-content/div[2]/ion-list/ion-item[1]/div[1]/div/ion-label/span'));
  }

  getEditHospitalName(){
    return element(by.xpath('//*[@id="editNameBtn"]'));
  }

  getOK(){
    return element(by.buttonText('OK'));
  }

  getTestHospitalLabel(){
    return element(by.xpath('//*[@id="hospitalName"]/div[1]/div/ion-label'));
  }

  getAddDatabaseRelease(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-details/ion-content/div[2]/div/button/div[1]/div'));
  }

  getNewDBReleaseComments(){
    return element(by.className('alert-input ng-pristine ng-valid ng-touched'));
  }

  getCREATERELEASE(){
    return element(by.buttonText('Create Release'));
  }

  getNewRelease(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-details/ion-content/div[2]/div/ion-list/ion-item[3]'));
  }

  getLatestDeploy(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-details/ion-content/div[2]/div/ion-list/ion-item[3]/div[1]/div/ion-label/div/span[3]/button[1]'));
  }

  getPreviousDeploy(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-details/ion-content/div[2]/div/ion-list/ion-item[1]/div[1]/div/ion-label/div/span[3]/button[1]'));
  }

  getDEPLOY(){
    return element(by.xpath('/html/body/ion-app/ion-alert/div/div[3]/button[2]/span'));
  }

  getLatestDelete(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-details/ion-content/div[2]/div/ion-list/ion-item[3]/div[1]/div/ion-label/div/span[3]/button[2]/span'));
  }

  getDELETE(){
    return element(by.xpath('/html/body/ion-app/ion-alert/div/div[3]/button[2]/span'));
  }

  getDeployedStatus(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-hospital-details/ion-content/div[2]/div/ion-list/ion-item[3]/div[1]/div/ion-label/div/span[3]/span'));
  }
}
