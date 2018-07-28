import { browser, element, by, ElementFinder } from 'protractor';

export class SettingsPageObject{

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

  getMenuButton(){
    return element(by.className('bar-buttons bar-buttons-md bar-button bar-button-md bar-button-default bar-button-default-md bar-button-menutoggle bar-button-menutoggle-md'));
  }

  getSettingsPage(){
    return element(by.xpath('//*[@id="settings"]/button'));
  }

  getChangeHospitalDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[1]/form/ion-item/div[1]/div/ion-select'));
  }

  getSelectedDB(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[1]/form[2]/ion-item/div[1]/div/ion-select'));
  }

  getChangePassword(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[2]/div[3]/button[1]'));
  }

  getCurrentPassword(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[2]/div[3]/form/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getNewPassword(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[2]/div[3]/form/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getRepeatPassword(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[2]/div[3]/form/ion-item[3]/div[1]/div/ion-input/input'));
  }

  getConfirmButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[2]/div[3]/form/ion-buttons/button[1]'));
  }

  getHomepage(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]'));
  }

  getSettingsEdit(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[1]/ion-item[1]/div[1]/ion-toggle'));
  }

  getAntimicrobialsPage(){
    return element(by.xpath('//*[@id="regularFuncions"]/button[1]'));
  }

  getAntimicrobialsEdit(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-header/ion-navbar/ion-buttons/div/ion-toggle'));
  }

}
