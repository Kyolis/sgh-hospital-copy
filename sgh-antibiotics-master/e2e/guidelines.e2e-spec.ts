import { browser, element, by, ElementFinder } from 'protractor';
import {GuidelinesPageObject} from './page-objects/guidelines.page-object';
import { loginAdmin, loginUser, logout } from './setup.e2e-spec';

let guidelines = new GuidelinesPageObject();
var until = protractor.ExpectedConditions;

describe('Add New Guideline', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    guidelines.browseToPage();
  });

  it('Should Add New Guideline', function () {
    //selecting a hospital

    browser.driver.sleep(3000);
    browser.waitForAngular().then(function(){
      browser.wait(until.visibilityOf(guidelines.getHospital()),5000)
        .then(function(){
          guidelines.getHospital().click()
            .then(function(){
              browser.wait(until.visibilityOf(element(by.buttonText('Singapore General Hospital'))),5000);
              browser.driver.sleep(1000);
              element(by.buttonText('test-hospital')).click()
                .then(function(){

                  //logging in

                  browser.wait(until.visibilityOf(guidelines.getLoginEmailInput()), 5000)
                    .then(function(){
                      guidelines.getLoginEmailInput().sendKeys('superadmin@example.sg');
                      guidelines.getLoginPasswordInput().sendKeys('start123');
                      browser.driver.sleep(500);
                      guidelines.getLoginButton().click();
                    })
                })
            })
        })
    });

    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    browser.driver.sleep(500);
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettings()));
    browser.driver.sleep(500);
    guidelines.getSettings().click();
    browser.driver.wait(until.visibilityOf(guidelines.getDatabase()));
    browser.driver.sleep(500);
    guidelines.getDatabase().click();
    browser.driver.wait(until.visibilityOf(guidelines.getStagingMode()));
    browser.driver.sleep(500);
    guidelines.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettingsEdit()));
    browser.driver.sleep(500);
    guidelines.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getGuidelinesPage()));
    browser.driver.sleep(500);
    guidelines.getGuidelinesPage().click();

    //Add Guideline
    browser.driver.sleep(1000);
    browser.driver.wait(until.visibilityOf(guidelines.getAddGuidelineButton()));
    guidelines.getAddGuidelineButton().click();
    browser.driver.wait(until.visibilityOf(guidelines.getAlertTitle()));
    browser.driver.sleep(500);
    guidelines.getAlertTitle().click();
    guidelines.getGuidelineNameInput().sendKeys('new-guideline');
    browser.driver.sleep(500);
    guidelines.getAdd().click();

    //check if new guideline is created
    browser.driver.wait(until.visibilityOf(guidelines.getGuideline()));
    expect<any>(guidelines.getGuideline().getText()).toBe('new-guideline');
  });

});

describe('View Guideline', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    guidelines.browseToPage();
  });

  it('Should View Guideline', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    browser.driver.sleep(500);
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettings()));
    browser.driver.sleep(500);
    guidelines.getSettings().click();
    browser.driver.wait(until.visibilityOf(guidelines.getDatabase()));
    browser.driver.sleep(500);
    guidelines.getDatabase().click();
    browser.driver.wait(until.visibilityOf(guidelines.getStagingMode()));
    browser.driver.sleep(500);
    guidelines.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettingsEdit()));
    browser.driver.sleep(500);
    guidelines.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getGuidelinesPage()));
    browser.driver.sleep(500);
    guidelines.getGuidelinesPage().click();
    browser.driver.sleep(500);

    //Check if guideline 'new-guideline' can be viewed
    guidelines.getGuideline().click();
    browser.driver.wait(until.visibilityOf(guidelines.getTestGuidelineTitle()));
    expect<any>(guidelines.getTestGuidelineTitle().getText()).toBe('new-guideline');
  });

});

describe('Edit Guideline Name', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    guidelines.browseToPage();
  });

  it('Should Edit Guideline Name', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    browser.driver.sleep(500);
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettings()));
    browser.driver.sleep(500);
    guidelines.getSettings().click();
    browser.driver.wait(until.visibilityOf(guidelines.getDatabase()));
    browser.driver.sleep(500);
    guidelines.getDatabase().click();
    browser.driver.wait(until.visibilityOf(guidelines.getStagingMode()));
    browser.driver.sleep(500);
    guidelines.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettingsEdit()));
    browser.driver.sleep(500);
    guidelines.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getGuidelinesPage()));
    browser.driver.sleep(500);
    guidelines.getGuidelinesPage().click();
    browser.driver.sleep(500);

    //Rename guideline
    guidelines.getRenameButton().click();
    browser.driver.wait(until.visibilityOf(guidelines.getAlertTitle()));
    browser.driver.sleep(500);
    guidelines.getAlertTitle().click();
    guidelines.getGuidelineNameInput().sendKeys('new-guideline-test');
    browser.driver.sleep(500);
    guidelines.getSave().click();

    //check for newly renamed guideline
    browser.driver.sleep(500);
    expect<any>(guidelines.getGuideline().getText()).toBe('new-guideline-test');
  });

});

describe('Edit Guideline Information', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    guidelines.browseToPage();
  });

  it('Should Edit Guideline Information', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    browser.driver.sleep(500);
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettings()));
    browser.driver.sleep(500);
    guidelines.getSettings().click();
    browser.driver.wait(until.visibilityOf(guidelines.getDatabase()));
    browser.driver.sleep(500);
    guidelines.getDatabase().click();
    browser.driver.wait(until.visibilityOf(guidelines.getStagingMode()));
    browser.driver.sleep(500);
    guidelines.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettingsEdit()));
    browser.driver.sleep(500);
    guidelines.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getGuidelinesPage()));
    browser.driver.sleep(500);
    guidelines.getGuidelinesPage().click();
    browser.driver.sleep(500);

    //Edit guideline info
    guidelines.getGuideline().click();
    browser.driver.wait(until.visibilityOf(guidelines.getTestGuidelineTitle()));
    browser.driver.sleep(500);
    guidelines.getGuidelineTextArea().sendKeys('This is a test');
    browser.driver.sleep(500);
    guidelines.getSave().click();

    //check for newly renamed guideline
    browser.driver.sleep(500);
    expect<any>(guidelines.getGuidelineText().getText()).toBe('This is a test');
  });

});

describe('Delete Guideline', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    guidelines.browseToPage();
  });

  it('Should Delete Guideline', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    browser.driver.sleep(500);
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettings()));
    browser.driver.sleep(500);
    guidelines.getSettings().click();
    browser.driver.wait(until.visibilityOf(guidelines.getDatabase()));
    browser.driver.sleep(500);
    guidelines.getDatabase().click();
    browser.driver.wait(until.visibilityOf(guidelines.getStagingMode()));
    browser.driver.sleep(500);
    guidelines.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(guidelines.getSettingsEdit()));
    browser.driver.sleep(500);
    guidelines.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(guidelines.getMenu()));
    guidelines.getMenu().click();
    browser.driver.wait(until.visibilityOf(guidelines.getGuidelinesPage()));
    browser.driver.sleep(500);
    guidelines.getGuidelinesPage().click();
    browser.driver.sleep(500);

    //Delete Guideline
    browser.driver.wait(until.visibilityOf(guidelines.getDeleteButton()));
    guidelines.getDeleteButton().click();
    browser.driver.sleep(500);
    guidelines.getDELETE().click();

    //check for presence of any guidelines (to be false)
    browser.driver.sleep(500);
    expect<any>(guidelines.getGuideline().isPresent()).toBe(false);
  });

});
