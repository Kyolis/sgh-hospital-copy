import { browser, element, by, ElementFinder } from 'protractor';

export class UserManagementPageObject{
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

  getUserManagementPage(){
    return element(by.xpath('//*[@id="adminFunctions"]/button[1]'));
  }

  getSearchBar(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-management/ion-content/div[2]/ion-searchbar/div/input'));
  }

  getFirstSearchResult(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-management/ion-content/div[2]/ion-list/button[1]/div[1]/div'));
  }

  getUserTitle(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-details/ion-header/ion-navbar/div[2]/ion-title/div'));
  }

  getSuperadminRadio(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-details/ion-content/div[2]/ion-list/ion-item[1]/div[1]/ion-toggle'));
  }

  getHospitalAdminRadio(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-details/ion-content/div[2]/ion-list/ion-item[2]/div[1]/ion-toggle'));
  }

  getBackButton(){
    return element(by.className('back-button bar-button bar-button-md back-button-md bar-button-default bar-button-default-md show-back-button'));
  }

  getSettings(){
    return element(by.xpath('//*[@id="settings"]/button'));
  }

  getRoles(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[2]/div[2]/span[1]'));
  }

  getHospitalDropdown(){
    return element(by.className('item-cover item-cover-md item-cover-default item-cover-default-md'));
  }
}
