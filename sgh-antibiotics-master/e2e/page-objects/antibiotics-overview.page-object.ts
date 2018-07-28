import { browser, element, by, ElementFinder } from 'protractor';

export class AntibioticsOverviewPageObject {

  constructor(){

  }

  browseToPage(){

    browser.get('');
    browser.driver.sleep(500);

  }

  //Antibiotics Overview Page Components
  getHomepage(){
    //Wait for browser to sync angular before retrieving homepage
    browser.driver.sleep(500);
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]'));
  }

  //Menu Components
  getMenuButton(){
    //Wait for browser to sync angular before retrieving menu button
    browser.driver.sleep(2000);
    //return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-header/ion-navbar/button[2]'));
    return element(by.className('bar-buttons bar-buttons-md bar-button bar-button-md bar-button-default bar-button-default-md bar-button-menutoggle bar-button-menutoggle-md'));
  }

  getSettingsButton(){
    //Wait for browser to sync angular before retrieving settings button
    browser.driver.sleep(750);
    return element(by.xpath('//*[@id="settings"]/button'));
  }

  getAdminList(){
    return element.all(by.id('adminFunctions'));
  }

  //[Menu] --> [Settings] Components
  getSwitchUserButton(){
    //Wait for browser to sync angular before retrieving switch user button
    browser.driver.sleep(500);
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-footer/button'));

  }





}
