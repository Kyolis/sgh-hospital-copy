

import { browser, element, by, ElementFinder } from 'protractor';
import { WizardPageObject } from './page-objects/wizard.page-object';
import { AntibioticsOverviewPageObject } from './page-objects/antibiotics-overview.page-object';

let wizardPage = new WizardPageObject();
let antibioticsOverviewPage = new AntibioticsOverviewPageObject();

export let logout = () =>{
  antibioticsOverviewPage.getMenuButton().click();
  antibioticsOverviewPage.getSettingsButton().click();
  antibioticsOverviewPage.getSwitchUserButton().click();
};

export let loginAdmin = () =>{
  wizardPage.getLoginEmailInput().sendKeys('superadmin@example.sg');
  wizardPage.getLoginPasswordInput().sendKeys('start123');
  browser.driver.sleep(750);
  wizardPage.getLoginButton().click();
};

export let loginUser = () =>{
  wizardPage.getLoginEmailInput().sendKeys('girolkyle3@gmail.com');
  wizardPage.getLoginPasswordInput().sendKeys('kyle324');
  browser.driver.sleep(750);
  wizardPage.getLoginButton().click();
};

let getRandomEmail = () =>{
  let strValues = 'abcdefghijk123456789';
  let strEmail = '';
  for (let i = 0; i < strValues.length; i++) {
    strEmail = strEmail + strValues.charAt(Math.round(strValues.length * Math.random()));
  }
  return strEmail + '@mySelenium.test';
};

let registerUser = () =>{
  let email:string = getRandomEmail();
  let password:string = 'pass123';

  browser.driver.sleep(750);
  wizardPage.getRegisterDropdown().click();
  wizardPage.getRegisterEmailInput().sendKeys(email); //existing account
  wizardPage.getRegisterPasswordInput().sendKeys(password);
  wizardPage.getRegisterRepeatPasswordInput().sendKeys(password);
  wizardPage.getRegisterButton().click();
};
describe('Login Test Cases', () => {

  browser.waitForAngularEnabled(false);

  beforeEach(() => {
    wizardPage.browseToPage();
    browser.waitForAngular();
  });


  it('it should login as Admin: Changi Hospital', () => {
    browser.driver.sleep(2000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    browser.driver.sleep(500);
    wizardPage.getChangiGeneralHospital().click();

    loginAdmin();
    browser.driver.sleep(2000);
    //Expects if homepage AND admin menu list is displayed and logs out
    expect<any>(antibioticsOverviewPage.getHomepage().isPresent()).toBe(true);
    expect<any>(antibioticsOverviewPage.getAdminList().isPresent()).toBe(true);
    logout();
  });

  it('it should login as Admin: Singapore General Hospital', () => {
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Singapore General Hospital
    browser.driver.sleep(500);
    wizardPage.getSingaporeGeneralHospital().click();

    loginAdmin();
    browser.driver.sleep(1500);
    //Expects if homepage AND admin menu list is displayed and logs out
    expect<any>(antibioticsOverviewPage.getHomepage().isPresent()).toBe(true);
    expect<any>(antibioticsOverviewPage.getAdminList().isPresent()).toBe(true);
    logout();
  });

  it('it should login as User: Changi General Hospital', () => {
    browser.driver.sleep(2000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    browser.driver.sleep(500);
    wizardPage.getChangiGeneralHospital().click();

    loginUser();
    browser.driver.sleep(2000);
    //Expects if homepage AND admin menu list is NOT displayed and logs out
    expect<any>(antibioticsOverviewPage.getHomepage().isPresent()).toBe(true);
    expect<any>(antibioticsOverviewPage.getAdminList().isPresent()).toBe(false);
    logout();
  });

  it('it should login as User: Singapore General Hospital', () => {
    browser.driver.sleep(2000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Singapore General Hospital
    browser.driver.sleep(500);
    wizardPage.getSingaporeGeneralHospital().click();

    loginUser();
    browser.driver.sleep(1500);
    //Expects if homepage AND admin menu list is NOT displayed and logs out
    expect<any>(antibioticsOverviewPage.getHomepage().isPresent()).toBe(true);
    expect<any>(antibioticsOverviewPage.getAdminList().isPresent()).toBe(false);
    logout();
  });



});

describe('Registration Test Cases', () => {

  browser.waitForAngularEnabled(false);

  beforeEach(() => {
    wizardPage.browseToPage();
    browser.waitForAngular();
  });

  it('it should register a New User', () => {
    browser.driver.sleep(2000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    browser.driver.sleep(500);
    wizardPage.getChangiGeneralHospital().click();

    registerUser();
    browser.driver.sleep(1500);
    //Expects if homepage is displayed after successful registration
    expect<any>(antibioticsOverviewPage.getHomepage().isPresent()).toBe(true);
    logout();
  });



});
