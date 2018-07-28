import { browser, element, by, ElementFinder } from 'protractor';
import { CalculatorPageObject } from './page-objects/calculator.page-object';
import { WizardPageObject } from './page-objects/wizard.page-object';
import { logout } from './setup.e2e-spec';

let calculator = new CalculatorPageObject();
var until = protractor.ExpectedConditions;
let wizardPage = new WizardPageObject();

let navigatetoCalculatorPage =()=>{

  browser.waitForAngular().then(function(){
    browser.driver.sleep(2000);
    browser.wait(until.visibilityOf(calculator.getMenuButton()), 5000)
      .then(function(){

        //opening menu
        browser.driver.sleep(1000);
        calculator.getMenuButton().click()
          .then(function(){
            browser.driver.wait(until.visibilityOf(calculator.getCalculatorPage()),5000)
              .then(function(){

                //opening CalculatorPage
                browser.driver.sleep(500);
                calculator.getCalculatorPage().click();
                browser.driver.sleep(1000);
              })
          })
      })
  });

};

describe('Calculator Test Cases', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    calculator.browseToPage();
  });


  it('Should Calculate Cockroft ', function () {

    /**selecting a hospital**/

    browser.driver.sleep(3000);
    browser.waitForAngular().then(function(){
      //browser.driver.sleep(5000);
      browser.wait(until.visibilityOf(calculator.getHospital()),5000)
        .then(function(){
          calculator.getHospital().click()
            .then(function(){
              browser.wait(until.visibilityOf(element(by.buttonText('Singapore General Hospital'))),5000);
              browser.driver.sleep(1000);
              element(by.buttonText('Singapore General Hospital')).click()
                .then(function(){

                  /**logging in**/

                  browser.wait(until.visibilityOf(calculator.getLoginEmailInput()), 5000)
                    .then(function(){
                      calculator.getLoginEmailInput().sendKeys('girolkyle3@gmail.com');
                      calculator.getLoginPasswordInput().sendKeys('kyle324');
                      browser.driver.sleep(500);
                      calculator.getLoginButton().click();
                      browser.driver.sleep(2000);
                    })
                })
            })
        })


  });

    //opening menu button and navigating to Calculator

    browser.waitForAngular().then(function(){
      browser.driver.sleep(2000);
      browser.wait(until.visibilityOf(calculator.getMenuButton()), 5000)
        .then(function(){

          //opening menu
          browser.driver.sleep(1000);
          calculator.getMenuButton().click()
            .then(function(){
              browser.driver.wait(until.visibilityOf(calculator.getCalculatorPage()),5000)
                .then(function(){

                  //opening CalculatorPage
                  browser.driver.sleep(500);
                  calculator.getCalculatorPage().click();
                  browser.driver.sleep(1000);
                })
            })
        })
    });

    //Calculate Cockroft

    calculator.getCockroftDropdown().click();
    browser.driver.sleep(1000);
    calculator.getCockroftGenderOption().click();
    browser.driver.sleep(2000);
    calculator.getMale().click();
    calculator.getCockroftAge().sendKeys('20');
    calculator.getCockroftWeight().sendKeys('75');
    calculator.getCockroftSerum().sendKeys('23');

    //check if calculated and returns correct value
    browser.driver.sleep(1000);
    expect<any>(calculator.getCockroftValue().isPresent()).toBe(true);
    expect<any>(calculator.getCockroftValue().getText()).toBe('481.30 mL/min');

});

  it('Should Calculate Ideal Body Weight', function () {
    //opening menu button and navigating to Calculator
    navigatetoCalculatorPage();

    //Calculating Ideal Body Weight
    browser.waitForAngular().then(function(){
      calculator.getIdealBodyWeightDropdown().click();
      browser.driver.sleep(1000);
      calculator.getIdealBodyWeightGenderOption().click()
        .then(function(){

          //selecting gender & inputting height
          browser.wait(until.visibilityOf(calculator.getMale()),5000);
          browser.driver.sleep(1000);
          calculator.getFemale().click();
          browser.driver.sleep(500);
          calculator.getIdealBodyWeightHeight().sendKeys('173');

          //check if calculated and returns correct value
          browser.driver.sleep(1000);
          expect<any>(calculator.getIdealBodyWeightValue().isPresent()).toBe(true);
          expect<any>(calculator.getIdealBodyWeightValue().getText()).toBe('64.15 kg');

        });

    });

  });


  it('Should Calculate Adjusted Body Weight ', function () {
    //opening menu button and navigating to Calculator
    navigatetoCalculatorPage();

    //Calculating Adjusted Body Weight
    browser.waitForAngular().then(function(){
      calculator.getAdjustedBodyWeightDropdown().click()
        .then(function(){
          browser.driver.sleep(1000);

          //inputting height & weight
          calculator.getAdjustedBodyWeightHeight().sendKeys('123')
            .then(function(){
              browser.waitForAngular();
              calculator.getAdjustedBodyWeightWeight().sendKeys('200');

              //check if calculated and returns correct value
              browser.driver.sleep(1000);
              expect<any>(calculator.getAdjustedBodyWeightValue().isPresent()).toBe(true);
              expect<any>(calculator.getAdjustedBodyWeightValue().getText()).toBe('110.00 kg');
            });

        })
    });

  });

  it('Should Calculate Body Surface Area ', function () {
    //opening menu button and navigating to Calculator
    navigatetoCalculatorPage();

    //Calculating Body Surface Area
    browser.waitForAngular().then(function(){
      calculator.getBodySurfaceAreaDropdown().click()
        .then(function(){
          browser.driver.sleep(1000);

          //inputting height & weight
          calculator.getBodySurfaceAreaHeight().sendKeys('175')
            .then(function(){
              browser.waitForAngular();
              calculator.getBodySurfaceAreaWeight().sendKeys('70');

              //check if calculated and returns 1.85m^2
              expect<any>(calculator.getBodySurfaceAreaValue().isPresent()).toBe(true);
              expect<any>(calculator.getBodySurfaceAreaValue().getText()).toBe('1.85 m2');
              browser.driver.sleep(1000);
            })
        })

    })

  });


  it('Should Calculate CURB-65', function () {
    //opening menu button and navigating to Calculator
    navigatetoCalculatorPage();

    //Calculating CURB-65
    browser.waitForAngular().then(function(){
      calculator.getCURBDropdown().click();
      browser.wait(until.visibilityOf(calculator.getConfusion()), 5000)
        .then(function(){
          browser.driver.sleep(1000);

          //testing out CURB combinations
          calculator.getCURBAge().click();
          browser.driver.sleep(500);

          //check if calculated
          expect<any>(calculator.getCURBvalue().getText()).toBe('Points = 1\nLow severity (risk of death < 3%). Outpatient therapy is usually appropriate.');
          browser.driver.sleep(3000);
          logout();
        })


    });



  });



});

describe('Calculator Test Cases - via Admin Account', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    calculator.browseToPage();
  });


  it('Should Calculate Cockroft as an Admin', function () {

    /**selecting a hospital**/

    browser.driver.sleep(3000);
    browser.waitForAngular().then(function(){
      //browser.driver.sleep(5000);
      browser.wait(until.visibilityOf(calculator.getHospital()),5000)
        .then(function(){
          calculator.getHospital().click()
            .then(function(){
              browser.wait(until.visibilityOf(element(by.buttonText('Singapore General Hospital'))),5000);
              browser.driver.sleep(1000);
              element(by.buttonText('Singapore General Hospital')).click()
                .then(function(){

                  /**logging in**/

                  browser.wait(until.visibilityOf(calculator.getLoginEmailInput()), 5000)
                    .then(function(){
                      calculator.getLoginEmailInput().sendKeys('superadmin@example.sg');
                      calculator.getLoginPasswordInput().sendKeys('start123');
                      browser.driver.sleep(500);
                      calculator.getLoginButton().click();
                      browser.driver.sleep(2000);
                    })
                })
            })
        })


    });

    //opening menu button and navigating to Calculator

    browser.waitForAngular().then(function(){
      browser.driver.sleep(2000);
      browser.wait(until.visibilityOf(calculator.getMenuButton()), 5000)
        .then(function(){

          //opening menu
          browser.driver.sleep(1000);
          calculator.getMenuButton().click()
            .then(function(){
              browser.driver.wait(until.visibilityOf(calculator.getCalculatorPage()),5000)
                .then(function(){

                  //opening CalculatorPage
                  browser.driver.sleep(500);
                  calculator.getCalculatorPage().click();
                  browser.driver.sleep(1000);
                })
            })
        })
    });

    //Calculate Cockroft

    calculator.getCockroftDropdown().click();
    browser.driver.sleep(1000);
    calculator.getCockroftGenderOption().click();
    browser.driver.sleep(2000);
    calculator.getMale().click();
    calculator.getCockroftAge().sendKeys('20');
    calculator.getCockroftWeight().sendKeys('75');
    calculator.getCockroftSerum().sendKeys('23');

    //check if calculated and returns correct value
    browser.driver.sleep(1000);
    expect<any>(calculator.getCockroftValue().isPresent()).toBe(true);
    expect<any>(calculator.getCockroftValue().getText()).toBe('481.30 mL/min');

  });

  it('Should Calculate Ideal Body Weight as an Admin', function () {
    //opening menu button and navigating to Calculator
    navigatetoCalculatorPage();

    //Calculating Ideal Body Weight
    browser.waitForAngular().then(function(){
      calculator.getIdealBodyWeightDropdown().click();
      browser.driver.sleep(1000);
      calculator.getIdealBodyWeightGenderOption().click()
        .then(function(){

          //selecting gender & inputting height
          browser.wait(until.visibilityOf(calculator.getMale()),5000);
          browser.driver.sleep(1000);
          calculator.getFemale().click();
          browser.driver.sleep(500);
          calculator.getIdealBodyWeightHeight().sendKeys('173');

          //check if calculated and returns correct value
          browser.driver.sleep(1000);
          expect<any>(calculator.getIdealBodyWeightValue().isPresent()).toBe(true);
          expect<any>(calculator.getIdealBodyWeightValue().getText()).toBe('64.15 kg');

        });

    });

  });


  it('Should Calculate Adjusted Body Weight as an Admin', function () {
    //opening menu button and navigating to Calculator
    navigatetoCalculatorPage();

    //Calculating Adjusted Body Weight
    browser.waitForAngular().then(function(){
      calculator.getAdjustedBodyWeightDropdown().click()
        .then(function(){
          browser.driver.sleep(1000);

          //inputting height & weight
          calculator.getAdjustedBodyWeightHeight().sendKeys('123')
            .then(function(){
              browser.waitForAngular();
              calculator.getAdjustedBodyWeightWeight().sendKeys('200');

              //check if calculated and returns correct value
              browser.driver.sleep(1000);
              expect<any>(calculator.getAdjustedBodyWeightValue().isPresent()).toBe(true);
              expect<any>(calculator.getAdjustedBodyWeightValue().getText()).toBe('110.00 kg');
            });

        })
    });

  });

  it('Should Calculate Body Surface Area as an Admin', function () {
    //opening menu button and navigating to Calculator
    navigatetoCalculatorPage();

    //Calculating Body Surface Area
    browser.waitForAngular().then(function(){
      calculator.getBodySurfaceAreaDropdown().click()
        .then(function(){
          browser.driver.sleep(1000);

          //inputting height & weight
          calculator.getBodySurfaceAreaHeight().sendKeys('175')
            .then(function(){
              browser.waitForAngular();
              calculator.getBodySurfaceAreaWeight().sendKeys('70');

              //check if calculated and returns 1.85m^2
              expect<any>(calculator.getBodySurfaceAreaValue().isPresent()).toBe(true);
              expect<any>(calculator.getBodySurfaceAreaValue().getText()).toBe('1.85 m2');
              browser.driver.sleep(1000);
            })
        })

    })

  });


  it('Should Calculate CURB-65 as an Admin', function () {
    //opening menu button and navigating to Calculator
    navigatetoCalculatorPage();

    //Calculating CURB-65
    browser.waitForAngular().then(function(){
      calculator.getCURBDropdown().click();
      browser.wait(until.visibilityOf(calculator.getConfusion()), 5000)
        .then(function(){
          browser.driver.sleep(1000);

          //testing out CURB combinations
          calculator.getCURBAge().click();
          browser.driver.sleep(500);

          //check if calculated
          expect<any>(calculator.getCURBvalue().getText()).toBe('Points = 1\nLow severity (risk of death < 3%). Outpatient therapy is usually appropriate.');
          logout();
        })


    });



  });



});

