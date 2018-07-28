import { browser, element, by, ElementFinder } from 'protractor';
import { HospitalManagementPageObject} from './page-objects/hospital-management.page-object';
import { loginAdmin, loginUser, logout } from './setup.e2e-spec';

let hospitalManage = new HospitalManagementPageObject();
var until = protractor.ExpectedConditions;

let loginAsAdmin = () =>{
  browser.driver.sleep(3000);
  browser.waitForAngular().then(function(){
    browser.wait(until.visibilityOf(hospitalManage.getHospitalDropdown()),5000)
      .then(function(){
        hospitalManage.getHospitalDropdown().click()
          .then(function(){
            browser.wait(until.visibilityOf(element(by.buttonText('Singapore General Hospital'))),5000);
            browser.driver.sleep(1000);
            element(by.buttonText('Singapore General Hospital')).click()
              .then(function(){

                //logging in

                browser.wait(until.visibilityOf(hospitalManage.getLoginEmailInput()), 5000)
                  .then(function(){
                    hospitalManage.getLoginEmailInput().sendKeys('superadmin@example.sg');
                    hospitalManage.getLoginPasswordInput().sendKeys('start123');
                    browser.driver.sleep(500);
                    hospitalManage.getLoginButton().click();
                  })
              })
          })
      })
  });

};

let loginAsUser = () =>{
  browser.driver.sleep(3000);
  browser.waitForAngular().then(function(){
    browser.wait(until.visibilityOf(hospitalManage.getHospitalDropdown()),5000)
      .then(function(){
        hospitalManage.getHospitalDropdown().click()
          .then(function(){
            browser.wait(until.visibilityOf(element(by.buttonText('Singapore General Hospital'))),5000);
            browser.driver.sleep(1000);
            element(by.buttonText('Singapore General Hospital')).click()
              .then(function(){

                //logging in

                browser.wait(until.visibilityOf(hospitalManage.getLoginEmailInput()), 5000)
                  .then(function(){
                    hospitalManage.getLoginEmailInput().sendKeys('girolkyle3@gmail.com');
                    hospitalManage.getLoginPasswordInput().sendKeys('kyle324');
                    browser.driver.sleep(500);
                    hospitalManage.getLoginButton().click();
                  })
              })
          })
      })
  });

};

describe('Search Hospital', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    hospitalManage.browseToPage();
  });

  it('Should Search for Singapore General Hospital', function () {
    //loginAsAdmin();
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(hospitalManage.getMenu()));
    browser.driver.sleep(3000);
    hospitalManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getHospitalManagementPage()));
    browser.driver.sleep(1000);
    hospitalManage.getHospitalManagementPage().click();
    browser.driver.sleep(1000);
    hospitalManage.getSearchBar().sendKeys('Singapore');
    browser.driver.wait(until.visibilityOf(hospitalManage.getFirstSearched()));
    //check for Singapore General Hospital
    browser.driver.sleep(500);
    expect<any>(hospitalManage.getFirstSearched().getText()).toBe('Singapore General Hospital');
  });

});

describe('View Hospital Details', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    hospitalManage.browseToPage();
  });

  it('Should View Details for Singapore General Hospital', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(hospitalManage.getMenu()));
    browser.driver.sleep(500);
    hospitalManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getHospitalManagementPage()));
    browser.driver.sleep(500);
    hospitalManage.getHospitalManagementPage().click();
    browser.driver.sleep(500);
    hospitalManage.getSearchBar().sendKeys('Singapore');
    browser.driver.wait(until.visibilityOf(hospitalManage.getFirstSearched()));
    hospitalManage.getFirstSearched().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getResultSearchTitle()));
    //check for Singapore General Hospital
    browser.driver.sleep(500);
    expect<any>(hospitalManage.getResultSearchTitle().getText()).toBe('Singapore General Hospital');
  });

});

describe('Add Hospital', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    hospitalManage.browseToPage();
  });

  it('Should Create New Hospital "SoftwareTesting"', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(hospitalManage.getMenu()));
    browser.driver.sleep(500);
    hospitalManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getHospitalManagementPage()));
    browser.driver.sleep(500);
    hospitalManage.getHospitalManagementPage().click();
    browser.driver.sleep(500);
    browser.driver.wait(until.visibilityOf(hospitalManage.getAddHospitalButton()));
    hospitalManage.getAddHospitalButton().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getAlertTitle()));
    browser.driver.sleep(500);
    hospitalManage.getAlertTitle().click();
    hospitalManage.getAddHospitalInput().sendKeys('SoftwareTesting');
    browser.driver.sleep(1000);
    hospitalManage.getSAVE().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getSoftwareTestingHospital()));
    browser.driver.sleep(1000);
    expect<any>(hospitalManage.getSoftwareTestingHospital().isPresent()).toBe(true);
  });

});
describe('Edit Hospital Details', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    hospitalManage.browseToPage();
  });

  it('Should Edit Hospital "test-hospital"', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(hospitalManage.getMenu()));
    browser.driver.sleep(500);
    hospitalManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getHospitalManagementPage()));
    browser.driver.sleep(500);
    hospitalManage.getHospitalManagementPage().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getTestHospital()));
    browser.driver.sleep(500);
    hospitalManage.getTestHospital().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getTestHospitalLabel()));
    browser.driver.sleep(3000);
    hospitalManage.getEditHospitalName().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getOK()));
    browser.driver.sleep(500);
    hospitalManage.getOK().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getTestHospitalLabel()));

    //Check for title change
    expect<any>(hospitalManage.getTestHospitalLabel().getText()).toBe('test-hospital');
  });

});

describe('Add New Database Release', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    hospitalManage.browseToPage();
  });

  it('Should Create a Third Release', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(hospitalManage.getMenu()));
    browser.driver.sleep(500);
    hospitalManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getHospitalManagementPage()));
    browser.driver.sleep(500);
    hospitalManage.getHospitalManagementPage().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getTestHospital()));
    browser.driver.sleep(500);
    hospitalManage.getTestHospital().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getAddDatabaseRelease()));
    browser.driver.sleep(3000);
    hospitalManage.getAddDatabaseRelease().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getCREATERELEASE()));
    browser.driver.sleep(500);
    hospitalManage.getCREATERELEASE().click();

    //check for presence of new release
    browser.driver.wait(until.visibilityOf(hospitalManage.getNewRelease()));
    browser.driver.sleep(5000);
    expect<any>(hospitalManage.getNewRelease().isPresent()).toBe(true);

  });

});

describe('Set Release as Live Database', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    hospitalManage.browseToPage();
  });

  it('Should Deploy Latest Release', function () {
    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(hospitalManage.getMenu()));
    browser.driver.sleep(500);
    hospitalManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getHospitalManagementPage()));
    browser.driver.sleep(500);
    hospitalManage.getHospitalManagementPage().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getTestHospital()));
    browser.driver.sleep(500);
    hospitalManage.getTestHospital().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getLatestDeploy()));
    browser.driver.sleep(1000);
    hospitalManage.getLatestDeploy().click();
    browser.driver.sleep(1000);
    hospitalManage.getDEPLOY().click();

    //check for presence of new deployment
    browser.driver.wait(until.visibilityOf(hospitalManage.getDeployedStatus()));
    browser.driver.sleep(500);
    expect<any>(hospitalManage.getDeployedStatus().isPresent()).toBe(true);

    //deploying the previous and deleting the latest release for re-running of test case
    browser.driver.wait(until.visibilityOf(hospitalManage.getPreviousDeploy()));
    hospitalManage.getPreviousDeploy().click();
    browser.driver.sleep(1000);
    hospitalManage.getDEPLOY().click();
    browser.driver.wait(until.visibilityOf(hospitalManage.getLatestDelete()));
    browser.driver.sleep(1000);
    hospitalManage.getLatestDelete().click();
    browser.driver.sleep(500);
    hospitalManage.getDELETE().click();
    browser.driver.sleep(5000);

  });

});

