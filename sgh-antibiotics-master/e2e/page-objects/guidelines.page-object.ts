import { browser, element, by, ElementFinder } from 'protractor';

export class GuidelinesPageObject{

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

  getGuidelinesPage(){
    return element(by.buttonText('Guidelines'));
  }

  getSettings(){
    return element(by.xpath('//*[@id="settings"]/button'));
  }

  getStagingMode(){
    return element(by.buttonText('Staging'));
  }

  getDatabase(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[1]/form[2]/ion-item/div[1]/div/ion-select'));
  }

  getSettingsEdit(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[1]/ion-item[1]/div[1]/ion-toggle'));
  }

  getGuideline(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-guidelines/ion-content/div[2]/ion-list/ion-item/div[1]/div[1]/ion-label/div/h2/strong'));
  }

  getTestGuidelineTitle(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-guidelines-details/ion-header/ion-navbar/div[2]/ion-title/div'));
  }

  getAddGuidelineButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-guidelines/ion-content/div[2]/ion-list/button/div[1]/div'));
  }

  getAlertTitle(){
    return element(by.className('alert-title'));
  }
  getGuidelineNameInput(){
    return element(by.className('alert-input ng-pristine ng-valid ng-touched'));
  }

  getAdd(){
    return element(by.buttonText('Add'));
  }

  getRenameButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-guidelines/ion-content/div[2]/ion-list/ion-item/div[1]/div[2]/button[1]/span'));
  }

  getSave(){
    return element(by.buttonText('Save'));
  }

  getGuidelineTextArea(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-guidelines-details/ion-content/div[2]/edit-text/div/textarea'));
  }

  getGuidelineText(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-guidelines-details/ion-content/div[2]/edit-text/div/p'));
  }

  getDeleteButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-guidelines/ion-content/div[2]/ion-list/ion-item/div[1]/div[2]/button[2]/span'));
  }

  getDELETE(){
    return element(by.buttonText('Delete'));
  }
}
