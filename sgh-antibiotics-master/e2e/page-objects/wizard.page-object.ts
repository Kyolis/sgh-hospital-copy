import { browser, element, by, ElementFinder } from 'protractor';

export class WizardPageObject {

  constructor(){

  }

  browseToPage(){

    browser.get('');
    browser.driver.sleep(2000);

  }

  //Wizard Components
  getHospitalList() {
    //Wait for browser to sync angular before retrieving all the hospital options
    browser.driver.sleep(1000);
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/ion-list/ion-item/div[1]/div/ion-select'));
  }

  getChangiGeneralHospital(){
    //Wait for browser to sync angular before retrieving changi general hospital button
    browser.driver.sleep(1000);
    return element(by.buttonText('Changi General Hospital'));
  }

  getSingaporeGeneralHospital(){
    //Wait for browser to sync angular before retrieving Singapore general hospital button
    browser.driver.sleep(1000);
    return element(by.buttonText('Singapore General Hospital'));
  }

  //Login Components
  getLoginEmailInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/div/form/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getLoginPasswordInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/div/form/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getLoginButton(){
    //Wait for browser to sync angular before retrieving Login button
    browser.driver.sleep(500);
    return element(by.buttonText('Login'));
  }

  //Register Components
  getRegisterDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/ion-item[2]/div[1]/div/ion-label'));
  }

  getRegisterEmailInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/div/form/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getRegisterPasswordInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/div/form/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getRegisterRepeatPasswordInput(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/div/form/ion-item[3]/div[1]/div/ion-input/input'))
  }

  getRegisterButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-wizard/ion-content/div[2]/div/div/form/button'));
  }


}
