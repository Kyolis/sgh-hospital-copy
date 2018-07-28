import { browser, element, by, ElementFinder } from 'protractor';
import { UserManagementPageObject} from './page-objects/user-management.page-object';
import { loginAdmin, loginUser, logout } from './setup.e2e-spec';

let userManage = new UserManagementPageObject();
var until = protractor.ExpectedConditions;

let loginAsAdmin = () =>{
  browser.driver.sleep(3000);
  browser.waitForAngular().then(function(){
    browser.wait(until.visibilityOf(userManage.getHospitalDropdown()),5000)
      .then(function(){
        userManage.getHospitalDropdown().click()
          .then(function(){
            browser.wait(until.visibilityOf(element(by.buttonText('Singapore General Hospital'))),5000);
            browser.driver.sleep(1000);
            element(by.buttonText('Singapore General Hospital')).click()
              .then(function(){

                //logging in

                browser.wait(until.visibilityOf(userManage.getLoginEmailInput()), 5000)
                  .then(function(){
                    userManage.getLoginEmailInput().sendKeys('superadmin@example.sg');
                    userManage.getLoginPasswordInput().sendKeys('start123');
                    browser.driver.sleep(1000);
                    browser.wait(until.visibilityOf(userManage.getLoginButton()),5000);
                    userManage.getLoginButton().click();
                  })
              })
          })
      })
  });

};

let loginAsUser = () =>{
  browser.driver.sleep(3000);
  browser.waitForAngular().then(function(){
    browser.wait(until.visibilityOf(userManage.getHospitalDropdown()),5000)
      .then(function(){
        userManage.getHospitalDropdown().click()
          .then(function(){
            browser.wait(until.visibilityOf(element(by.buttonText('Singapore General Hospital'))),5000);
            browser.driver.sleep(1000);
            element(by.buttonText('Singapore General Hospital')).click()
              .then(function(){

                //logging in

                browser.wait(until.visibilityOf(userManage.getLoginEmailInput()), 5000)
                  .then(function(){
                    userManage.getLoginEmailInput().sendKeys('girolkyle3@gmail.com');
                    userManage.getLoginPasswordInput().sendKeys('kyle324');
                    browser.driver.sleep(500);
                    browser.wait(until.visibilityOf(userManage.getLoginButton()),5000);
                    userManage.getLoginButton().click();
                  })
              })
          })
      })
  });

};
describe('Search User', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    userManage.browseToPage();
  });

  it('Should Search User', function () {
    loginAsAdmin();

    //Searching for a user
    browser.driver.sleep(3000);
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(2000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getUserManagementPage()));
    browser.driver.sleep(500);
    userManage.getUserManagementPage().click();
    browser.driver.wait(until.visibilityOf(userManage.getSearchBar()));
    userManage.getSearchBar().sendKeys('girolkyle3@gmail.com');

    //check if search is returned
    browser.driver.wait(until.visibilityOf(userManage.getFirstSearchResult()));
    expect<any>(userManage.getFirstSearchResult().getText()).toBe('girolkyle3@gmail.com');
  });

});

describe('View User', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    userManage.browseToPage();
  });

  it('Should View User', function () {
    //Searching for a user and viewing
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(500);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getUserManagementPage()));
    browser.driver.sleep(500);
    userManage.getUserManagementPage().click();
    browser.driver.wait(until.visibilityOf(userManage.getSearchBar()));
    userManage.getSearchBar().sendKeys('girolkyle3@gmail.com');
    browser.driver.wait(until.visibilityOf(userManage.getFirstSearchResult()));
    browser.driver.sleep(500);
    userManage.getFirstSearchResult().click();

    //check the view of user's page
    browser.driver.wait(until.visibilityOf(userManage.getUserTitle()));
    expect<any>(userManage.getUserTitle().getText()).toBe('girolkyle3@gmail.com');
  });

});

describe('Grant Superadmin', () => {
  var originalTimeout;

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    userManage.browseToPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

    //increase jasmine timeout
    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })

  });

  it('Should Give Superadmin Rights to a User', function () {
    //Searching for a user and viewing
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(3000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getUserManagementPage()));
    browser.driver.sleep(500);
    userManage.getUserManagementPage().click();
    browser.driver.wait(until.visibilityOf(userManage.getSearchBar()));
    userManage.getSearchBar().sendKeys('girolkyle3@gmail.com');
    browser.driver.wait(until.visibilityOf(userManage.getFirstSearchResult()));
    browser.driver.sleep(500);
    userManage.getFirstSearchResult().click();
    browser.driver.wait(until.visibilityOf(userManage.getSuperadminRadio()));
    browser.driver.sleep(500);
    userManage.getSuperadminRadio().click();
    browser.driver.sleep(500);
    userManage.getBackButton().click();

    //logging in to the user account to check privileges
    logout();
    loginAsUser();

    //Checking privileges
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(3000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getSettings()));
    browser.driver.sleep(1000);
    userManage.getSettings().click();
    browser.driver.wait(until.visibilityOf(userManage.getRoles()));
    browser.driver.sleep(500);
    expect<any>(userManage.getRoles().getText()).toBe('Roles: superadmin');
    browser.driver.sleep(500);

    logout();
  });

});

describe('Remove Superadmin', () => {
  var originalTimeout;

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    userManage.browseToPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

    //increase jasmine timeout
    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })

  });

  it('Should Remove Superadmin Rights on a User', function () {
    loginAsAdmin();
    //Searching for a user and viewing
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(3000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getUserManagementPage()));
    browser.driver.sleep(500);
    userManage.getUserManagementPage().click();
    browser.driver.wait(until.visibilityOf(userManage.getSearchBar()));
    userManage.getSearchBar().sendKeys('girolkyle3@gmail.com');
    browser.driver.wait(until.visibilityOf(userManage.getFirstSearchResult()));
    browser.driver.sleep(500);
    userManage.getFirstSearchResult().click();
    browser.driver.wait(until.visibilityOf(userManage.getSuperadminRadio()));
    browser.driver.sleep(1000);
    userManage.getSuperadminRadio().click();
    browser.driver.sleep(500);
    userManage.getBackButton().click();

    //logging in to the user account to check privileges
    logout();
    loginAsUser();

    //Checking privileges
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(3000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getSettings()));
    browser.driver.sleep(1000);
    userManage.getSettings().click();
    browser.driver.wait(until.visibilityOf(userManage.getRoles()));
    browser.driver.sleep(500);
    expect<any>(userManage.getRoles().getText()).toBe('Roles: no roles');
    browser.driver.sleep(500);

    logout();
  });

});

describe('Grant Hospital Admin', () => {
  var originalTimeout;

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    userManage.browseToPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

    //increase jasmine timeout
    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })

  });

  it('Should Give Hospital Admin Rights to a User', function () {
    loginAsAdmin();
    //Searching for a user and viewing
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(3000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getUserManagementPage()));
    browser.driver.sleep(500);
    userManage.getUserManagementPage().click();
    browser.driver.wait(until.visibilityOf(userManage.getSearchBar()));
    userManage.getSearchBar().sendKeys('girolkyle3@gmail.com');
    browser.driver.wait(until.visibilityOf(userManage.getFirstSearchResult()));
    browser.driver.sleep(500);
    userManage.getFirstSearchResult().click();
    browser.driver.wait(until.visibilityOf(userManage.getHospitalAdminRadio()));
    browser.driver.sleep(500);
    userManage.getHospitalAdminRadio().click();
    browser.driver.sleep(500);
    userManage.getBackButton().click();

    //logging in to the user account to check privileges
    logout();
    loginAsUser();

    //Checking privileges
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(3000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getSettings()));
    browser.driver.sleep(1000);
    userManage.getSettings().click();
    browser.driver.wait(until.visibilityOf(userManage.getRoles()));
    browser.driver.sleep(500);
    expect<any>(userManage.getRoles().getText()).toBe('Roles: 8CUpQmGaDxFAEcqtNOPa');
    browser.driver.sleep(500);

    logout();
  });

});

describe('Remove Hospital Admin', () => {
  var originalTimeout;

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    userManage.browseToPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

    //increase jasmine timeout
    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })

  });

  it('Should Remove Hospital Admin Rights on a User', function () {
    loginAsAdmin();
    //Searching for a user and viewing
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(3000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getUserManagementPage()));
    browser.driver.sleep(500);
    userManage.getUserManagementPage().click();
    browser.driver.wait(until.visibilityOf(userManage.getSearchBar()));
    userManage.getSearchBar().sendKeys('girolkyle3@gmail.com');
    browser.driver.wait(until.visibilityOf(userManage.getFirstSearchResult()));
    browser.driver.sleep(500);
    userManage.getFirstSearchResult().click();
    browser.driver.wait(until.visibilityOf(userManage.getHospitalAdminRadio()));
    browser.driver.sleep(1000);
    userManage.getHospitalAdminRadio().click();
    browser.driver.sleep(500);
    userManage.getBackButton().click();

    //logging in to the user account to check privileges
    logout();
    loginAsUser();

    //Checking privileges
    browser.driver.wait(until.visibilityOf(userManage.getMenu()));
    browser.driver.sleep(3000);
    userManage.getMenu().click();
    browser.driver.wait(until.visibilityOf(userManage.getSettings()));
    browser.driver.sleep(1000);
    userManage.getSettings().click();
    browser.driver.wait(until.visibilityOf(userManage.getRoles()));
    browser.driver.sleep(500);
    expect<any>(userManage.getRoles().getText()).toBe('Roles: no roles');
    browser.driver.sleep(500);

    logout();
  });

});
