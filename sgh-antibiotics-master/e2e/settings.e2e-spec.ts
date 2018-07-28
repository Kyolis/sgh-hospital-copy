import { browser, element, by, ElementFinder } from 'protractor';
import { WizardPageObject } from './page-objects/wizard.page-object';
import { loginAdmin, loginUser, logout } from './setup.e2e-spec';
import { SettingsPageObject } from './page-objects/settings.page-object';
import { describe } from 'selenium-webdriver/testing';

let settings = new SettingsPageObject();
let wizardPage = new WizardPageObject();
var until = protractor.ExpectedConditions;

//method to navigate to settings

let navigateToSettings =()=>{

  browser.waitForAngular().then(function(){
    browser.driver.sleep(2000);
    browser.wait(until.visibilityOf(settings.getMenuButton()), 5000)
      .then(function(){

        //opening menu
        browser.driver.sleep(1000);
        settings.getMenuButton().click()
          .then(function(){
            browser.driver.wait(until.visibilityOf(settings.getSettingsPage()),5000)
              .then(function(){

                //opening CalculatorPage
                browser.driver.sleep(500);
                settings.getSettingsPage().click();
                browser.driver.sleep(1000);
              })
          })
      })
  });

};

describe('Settings test Cases - via Admin Account', () => {
  var originalTimeout

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    settings.browseToPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  //increase jasmine timeout
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  })

  it('Should change hospital as an admin ', function () {
    /*browser.driver.sleep(3000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    browser.driver.sleep(500);
    wizardPage.getChangiGeneralHospital().click();

    loginAdmin();*/

    //changing hospitals
    browser.driver.sleep(2000);
    navigateToSettings();
    browser.driver.sleep(1000);
    settings.getChangeHospitalDropdown().click();
    browser.driver.sleep(1000);
    element(by.buttonText('Singapore General Hospital')).click();
    browser.driver.sleep(1000);

    //check if current hospital is Singapore General Hospital
    expect<any>(settings.getChangeHospitalDropdown().getText()).toBe('Singapore General Hospital');
    //logout();
  });

  it('Should change database to "Staging" as an admin', function () {
    browser.driver.sleep(2000);
    navigateToSettings();
    browser.driver.sleep(500);
    settings.getSelectedDB().click();
    browser.driver.sleep(1000);

    //change database to staging
    element(by.buttonText('Staging')).click();
    browser.driver.sleep(1000);

    //check if current database is staging
    expect<any>(settings.getSelectedDB().getText()).toBe('Staging');
  });

  it('Should change password as an admin ', function () {
    browser.driver.sleep(2000);
    navigateToSettings();
    browser.driver.sleep(500);
    settings.getChangePassword().click();
    browser.driver.sleep(1000);

    //changing password
    settings.getCurrentPassword().sendKeys('start123');
    settings.getNewPassword().sendKeys('start124');
    settings.getRepeatPassword().sendKeys('start124');
    browser.driver.sleep(2000);
    settings.getConfirmButton().click();
    browser.driver.sleep(3000);
    logout();

    browser.driver.sleep(3000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    wizardPage.getChangiGeneralHospital().click();

    //logging in with new password
    browser.driver.sleep(1000);
    wizardPage.getLoginEmailInput().sendKeys('superadmin@example.sg');
    wizardPage.getLoginPasswordInput().sendKeys('start124');
    wizardPage.getLoginButton().click();

    browser.driver.sleep(2000);

    //checking if homepage is shown after logging in (if logging in is successful)
    expect<any>(settings.getHomepage().isPresent()).toBe(true);
    browser.driver.sleep(500)
      .then(function(){

        //changing the password back to previous password
        navigateToSettings();
        browser.driver.sleep(500);
        settings.getChangePassword().click();
        browser.driver.sleep(1000);
        settings.getCurrentPassword().sendKeys('start124');
        settings.getNewPassword().sendKeys('start123');
        settings.getRepeatPassword().sendKeys('start123');
        browser.driver.sleep(2000);
        settings.getConfirmButton().click();
        browser.driver.sleep(1000);
        logout();
      });


  });

  it('Should change users as an admin', function () {

    /*navigateToSettings();
    browser.driver.sleep(500);
    settings.getSwitchButton().click();*/

    browser.driver.sleep(3000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    wizardPage.getChangiGeneralHospital().click();

    browser.driver.sleep(1000);
    wizardPage.getLoginEmailInput().sendKeys('secondadmin@example.sg');
    wizardPage.getLoginPasswordInput().sendKeys('start123');
    wizardPage.getLoginButton().click();

    browser.driver.sleep(2000);
    expect<any>(settings.getHomepage().isPresent()).toBe(true);
    browser.driver.sleep(5000)

  });

  it('Should set master edit as an admin', function () {
    browser.driver.sleep(2000);
    navigateToSettings();
    browser.driver.sleep(500);
    settings.getSelectedDB().click();
    browser.driver.sleep(1000);
    element(by.buttonText('Staging')).click();
    browser.driver.sleep(2000);
    settings.getSettingsEdit().click();

    browser.waitForAngular().then(function(){
      browser.driver.sleep(2000);
      browser.wait(until.visibilityOf(settings.getMenuButton()), 5000)
        .then(function(){

          //opening menu
          browser.driver.sleep(1000);
          settings.getMenuButton().click()
            .then(function(){
              browser.driver.wait(until.visibilityOf(settings.getAntimicrobialsPage()),5000)
                .then(function(){

                  //opening CalculatorPage
                  browser.driver.sleep(500);
                  settings.getAntimicrobialsPage().click();
                  browser.driver.sleep(1000);
                })
            })
        })
    });
      browser.driver.sleep(1000);
      expect<any>(settings.getAntimicrobialsEdit().isPresent()).toBe(true);
      browser.driver.sleep(2000);
      logout();
  });





});



describe('Settings Test Cases - via User Account', () => {
  var originalTimeout;

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    settings.browseToPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  //increase jasmine timeout
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('Should change hospital as a user ', function () {
    browser.driver.sleep(3000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    wizardPage.getChangiGeneralHospital().click();

    browser.driver.sleep(1000);
    loginUser();

    //changing hospitals
    browser.driver.sleep(2000);
    navigateToSettings();
    browser.driver.sleep(500);
    settings.getChangeHospitalDropdown().click();
    browser.driver.sleep(1000);
    element(by.buttonText('Singapore General Hospital')).click();
    browser.driver.sleep(1000);

    //check if current hospital is Singapore General Hospital
    expect<any>(settings.getChangeHospitalDropdown().getText()).toBe('Singapore General Hospital');
    //logout();
  });

  it('Should change password as a user ', function () {

    browser.driver.sleep(2000);
    navigateToSettings();
    browser.driver.sleep(500);
    settings.getChangePassword().click();
    browser.driver.sleep(1000);

    //changing password
    settings.getCurrentPassword().sendKeys('kyle324');
    settings.getNewPassword().sendKeys('kyle325');
    settings.getRepeatPassword().sendKeys('kyle325');
    browser.driver.sleep(2000);
    settings.getConfirmButton().click();
    browser.driver.sleep(3000);
    logout();

    browser.driver.sleep(3000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    wizardPage.getChangiGeneralHospital().click();

    //logging in with new password
    browser.driver.sleep(1000);
    wizardPage.getLoginEmailInput().sendKeys('girolkyle3@gmail.com');
    wizardPage.getLoginPasswordInput().sendKeys('kyle325');
    wizardPage.getLoginButton().click();

    browser.driver.sleep(2000);

    //checking if homepage is shown after logging in (if logging in is successful)
    expect<any>(settings.getHomepage().isPresent()).toBe(true);
    browser.driver.sleep(500)
      .then(function(){

        //changing the password back to previous password
        navigateToSettings();
        browser.driver.sleep(500);
        settings.getChangePassword().click();
        browser.driver.sleep(1000);
        settings.getCurrentPassword().sendKeys('kyle325');
        settings.getNewPassword().sendKeys('kyle324');
        settings.getRepeatPassword().sendKeys('kyle324');
        browser.driver.sleep(2000);
        settings.getConfirmButton().click();
        browser.driver.sleep(1000);
        logout();
      });


  });

  it('Should change users as a user', function () {

    /*navigateToSettings();
    browser.driver.sleep(500);
    settings.getSwitchButton().click();*/

    browser.driver.sleep(3000);
    //Retrieve and Selecting a Hospital
    wizardPage.getHospitalList().click();
    //Selecting Changi General Hospital
    wizardPage.getChangiGeneralHospital().click();

    browser.driver.sleep(1000);
    wizardPage.getLoginEmailInput().sendKeys('test@example.com');
    wizardPage.getLoginPasswordInput().sendKeys('test123');
    wizardPage.getLoginButton().click();

    browser.driver.sleep(2000);
    expect<any>(settings.getHomepage().isPresent()).toBe(true);
    browser.driver.sleep(500);
    logout();
  });




});

