import { browser, element, by, ElementFinder } from 'protractor';
import { AntimicrobialsPageObject } from './page-objects/antimicrobials.page-object';
import { describe } from 'selenium-webdriver/testing';
import { logout } from './setup.e2e-spec';

let antimicro = new AntimicrobialsPageObject();
var until = protractor.ExpectedConditions;

describe('View Miscellaneous - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should view Clindamycin', () => {

    //selecting a hospital

    browser.driver.sleep(3000);
    browser.waitForAngular().then(function(){
      browser.wait(until.visibilityOf(antimicro.getHospital()),5000)
        .then(function(){
          antimicro.getHospital().click()
            .then(function(){
              browser.wait(until.visibilityOf(element(by.buttonText('Singapore General Hospital'))),5000);
              browser.driver.sleep(1000);
              element(by.buttonText('Singapore General Hospital')).click()
                .then(function(){

                  //logging in

                  browser.wait(until.visibilityOf(antimicro.getLoginEmailInput()), 5000)
                    .then(function(){
                      antimicro.getLoginEmailInput().sendKeys('superadmin@example.sg');
                      antimicro.getLoginPasswordInput().sendKeys('start123');
                      browser.driver.sleep(500);
                      antimicro.getLoginButton().click();
                    })
                })
            })
        })
    });


    //view Clindamycin
    browser.driver.sleep(3000);
    antimicro.getMiscellaneousDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getClindamycin()));
    //browser.driver.sleep(1000);
    antimicro.getClindamycin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });
  });

  it('Should View Co-trimoxazole', function () {
    browser.driver.sleep(3000);
    antimicro.getMiscellaneousDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCotrimoxazole()));
    antimicro.getCotrimoxazole().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Daptomycin', function () {
    browser.driver.sleep(3000);
    antimicro.getMiscellaneousDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDaptomycin()));
    antimicro.getDaptomycin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Fusidic Acid', function () {
    browser.driver.sleep(3000);
    antimicro.getMiscellaneousDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getFusidicAcid()));
    antimicro.getFusidicAcid().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Linezolid', function () {
    browser.driver.sleep(3000);
    antimicro.getMiscellaneousDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getLinezolid()));
    antimicro.getLinezolid().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Metronidazole', function () {
    browser.driver.sleep(3000);
    antimicro.getMiscellaneousDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMetronidazole()));
    antimicro.getMetronidazole().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Nitrofurantoin', function () {
    browser.driver.sleep(3000);
    antimicro.getMiscellaneousDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCotrimoxazole()));
    antimicro.getNitrofurantoin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Polymyxin B', function () {
    browser.driver.sleep(3000);
    antimicro.getMiscellaneousDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getPolymyxinB()));
    antimicro.getPolymyxinB().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });
});

describe('View Aminoglycosides - Singapore General Hospital', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Amikacin', function () {
    browser.driver.sleep(3000);
    antimicro.getAminoglycosidesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAmikacin()));
    antimicro.getAmikacin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

});

describe('View Anti-tuberculosis Agents - Singapore General Hospital', () => {
  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Ethambutol', function () {
    browser.driver.sleep(3000);
    antimicro.getAntiTuberAgentsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getEthambutol()));
    antimicro.getEthambutol().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Isoniazid', function () {
    browser.driver.sleep(3000);
    antimicro.getAntiTuberAgentsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getIsoniazid()));
    antimicro.getIsoniazid().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Pyrazinamide', function () {
    browser.driver.sleep(3000);
    antimicro.getAntiTuberAgentsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getPyrazinamide()));
    antimicro.getPyrazinamide().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Rifampicin', function () {
    browser.driver.sleep(3000);
    antimicro.getAntiTuberAgentsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getRifampicin()));
    antimicro.getRifampicin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Streptomycin', function () {
    browser.driver.sleep(3000);
    antimicro.getAntiTuberAgentsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getStreptomycin()));
    antimicro.getStreptomycin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
        browser.driver.sleep(2000);
      });

  });

});


describe('View Carbapenems - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Doripenem', function () {
    browser.driver.sleep(3000);
    antimicro.getCarbapenemsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDoripenem()));
    antimicro.getDoripenem().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Ertapenem', function () {
    browser.driver.sleep(3000);
    antimicro.getCarbapenemsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getErtapenem()));
    antimicro.getErtapenem().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Imipenem/Cilastatin', function () {
    browser.driver.sleep(3000);
    antimicro.getCarbapenemsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getImipenemCilastatin()));
    antimicro.getImipenemCilastatin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Meropenem', function () {
    browser.driver.sleep(3000);
    antimicro.getCarbapenemsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMeropenem()));
    antimicro.getMeropenem().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

});


describe('View Cephalosporins - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Cefalaxin', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCefalexin()));
    antimicro.getCefalexin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Cefazolin', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCefazolin()));
    antimicro.getCefazolin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Cefepime', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCefepime()));
    antimicro.getCefepime().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Cefoxitin', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCefoxitin()));
    antimicro.getCefoxitin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Ceftaroline', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCeftaroline()));
    antimicro.getCeftaroline().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Ceftazidime', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCeftazidime()));
    antimicro.getCeftazidime().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Ceftazidime/Avibactam', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCeftazidimeAvibactam()));
    antimicro.getCeftazidimeAvibactam().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Ceftriaxone', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCeftriaxone()));
    antimicro.getCeftriaxone().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Cefuroxime', function () {
    browser.driver.sleep(3000);
    antimicro.getCephalosporinsDropddown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCefuroxime()));
    antimicro.getCefuroxime().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });


});


describe('View Glycopeptide - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Vancomycin', function () {
    browser.driver.sleep(3000);
    antimicro.getGlycopeptideDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getVancomycin()));
    antimicro.getVancomycin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

});


describe('View Macrolides - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Azithromycin', function () {
    browser.driver.sleep(3000);
    antimicro.getMacrolidesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAzithromycin()));
    antimicro.getAzithromycin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Clarithromycin', function () {
    browser.driver.sleep(3000);
    antimicro.getMacrolidesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getClarithromycin()));
    antimicro.getClarithromycin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

});


describe('View Manobactam - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Aztreonam', function () {
    browser.driver.sleep(3000);
    antimicro.getMonobactamDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAztreonam()));
    antimicro.getAztreonam().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

});


describe('View Penicillins - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Amoxicillin', function () {
    browser.driver.sleep(3000);
    antimicro.getPenicillinsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAmoxicillin()));
    antimicro.getAmoxicillin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Amoxicillin/Clavulanate', function () {
    browser.driver.sleep(3000);
    antimicro.getPenicillinsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAmoxicillinClavulanate()));
    antimicro.getAmoxicillinClavulanate().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Ampicillin', function () {
    browser.driver.sleep(3000);
    antimicro.getPenicillinsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAmpicillin()));
    antimicro.getAmpicillin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Ampicillin/Sulbactam', function () {
    browser.driver.sleep(3000);
    antimicro.getPenicillinsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAmpicillinSulbactam()));
    antimicro.getAmpicillinSulbactam().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Cloxacillin', function () {
    browser.driver.sleep(3000);
    antimicro.getPenicillinsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCloxacillin()));
    antimicro.getCloxacillin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Crystalline Penicillin G', function () {
    browser.driver.sleep(3000);
    antimicro.getPenicillinsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCrystallinePenicillinG()));
    antimicro.getCrystallinePenicillinG().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Penicillin V', function () {
    browser.driver.sleep(3000);
    antimicro.getPenicillinsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getPenicillinV()));
    antimicro.getPenicillinV().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Piperacillin/Tazobactam', function () {
    browser.driver.sleep(3000);
    antimicro.getPenicillinsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getPipercillinTazobactam()));
    antimicro.getPipercillinTazobactam().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

});


describe('View Quinolenes - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Ciprofloxacin', function () {
    browser.driver.sleep(3000);
    antimicro.getQuinolonesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getCiprofloxacin()));
    antimicro.getCiprofloxacin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Levofloxacin', function () {
    browser.driver.sleep(3000);
    antimicro.getQuinolonesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getLevofloxacin()));
    antimicro.getLevofloxacin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Moxifloxacin', function () {
    browser.driver.sleep(3000);
    antimicro.getQuinolonesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMoxifloxacin()));
    antimicro.getMoxifloxacin().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

});


describe('View Tetracyclines - Singapore General Hospital', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should View Doxycycline', function () {
    browser.driver.sleep(3000);
    antimicro.getTetracyclinesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDoxycycline()));
    antimicro.getDoxycycline().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Minocycline', function () {
    browser.driver.sleep(3000);
    antimicro.getTetracyclinesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMinocycline()));
    antimicro.getMinocycline().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Tetracycline', function () {
    browser.driver.sleep(3000);
    antimicro.getTetracyclinesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getTetracycline()));
    antimicro.getTetracycline().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

  it('Should View Tigecycline', function () {
    browser.driver.sleep(3000);
    antimicro.getTetracyclinesDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getTigecycline()));
    antimicro.getTigecycline().click();
    browser.wait(until.visibilityOf(antimicro.getAdministration()))
      .then(function(){
        //check for xpath of the next page's content
        expect<any>(antimicro.getAdministration().isPresent()).toBe(true);
      });

  });

});



describe('Search Antibiotic', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Search for "Clindamycin"', function () {
    browser.driver.wait(until.visibilityOf(antimicro.getSearchbar()));
    antimicro.getSearchbar().sendKeys('Clinda');
    browser.driver.sleep(400);
    /*antimicro.getMiscellaneousDropdown().click();*/
    //check for xpath of the next page's content
    expect<any>(antimicro.getClindamycin().isPresent()).toBe(true);
  });

});
describe('Search Antibiotic Dosage', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Search Antibiotic Dosage', function () {
    browser.driver.sleep(3000);
    antimicro.getAntiTuberAgentsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getPyrazinamide()));
    antimicro.getPyrazinamide().click();
    browser.wait(until.visibilityOf(antimicro.getRenalDoseInput()))
      .then(function(){
        browser.driver.sleep(1000);
        antimicro.getRenalDoseInput().sendKeys('1');
        //check for result
        browser.wait(until.visibilityOf(antimicro.getRenalDoseResult()));
        browser.driver.sleep(500);
        expect<any>(antimicro.getRenalDoseResult().isPresent()).toBe(true);
      });

  });

});


describe('Calculate Antibiotic Dosage', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Calculate Antibiotic Dosage', function () {
    browser.driver.sleep(3000);
    antimicro.getAntiTuberAgentsDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getPyrazinamide()));
    antimicro.getPyrazinamide().click();
    browser.wait(until.visibilityOf(antimicro.getCalculatorButton()))
      .then(function(){
        browser.driver.sleep(500);
        antimicro.getCalculatorButton().click();
        browser.driver.sleep(500);
        browser.wait(until.visibilityOf(antimicro.getCockroftGenderOption()));
        antimicro.getCockroftGenderOption().click();
        browser.wait(until.visibilityOf(antimicro.getMale()));
        browser.driver.sleep(500);
        antimicro.getMale().click();
        antimicro.getCockroftAge().sendKeys('20');
        antimicro.getCockroftWeight().sendKeys('75');
        antimicro.getCockroftSerum().sendKeys('23');
        browser.driver.sleep(500);
        expect<any>(antimicro.getCockroftValue().getText()).toBe('481.30 mL/min');
      });

  });

});

describe('Add New Antibiotic Group', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Add New Antibiotic Group', function () {
    //change hospital to test-hospital
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(3000);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()),5000);
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSelectedHospital()),5000);
    browser.driver.sleep(500);
    antimicro.getSelectedHospital().click();
    browser.driver.wait(until.visibilityOf(antimicro.getTestHospital()));
    browser.driver.sleep(1500);
    antimicro.getTestHospital().click();

    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getStagingMode()));
    browser.driver.sleep(500);
    antimicro.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticPage()));
    browser.driver.sleep(500);
    antimicro.getAntibioticPage().click();

    //wait to load hospital
    browser.driver.sleep(5000);

    //Adding new antibiotic group
    browser.driver.wait(until.visibilityOf(antimicro.getAddAntibioticGroupButton()));
    browser.driver.sleep(500);
    antimicro.getAddAntibioticGroupButton().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAddAntibioticGroupInput()));
    antimicro.getAddAntibioticGroupInput().sendKeys('testAntibioticGroup');
    browser.driver.sleep(500);
    antimicro.getAddButton().click();

    //check if there's a new antibiotic group
    browser.driver.sleep(500);
    expect<any>(antimicro.getAntibioticGroup().getText()).toBe('testAntibioticGroup');

    //set it to live to save new antibiotic group (must be deployed to see it in live)
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(500);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()));
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getLiveMode()));
    browser.driver.sleep(500);
    antimicro.getLiveMode().click();
    browser.driver.sleep(500);
  });

});

describe('Edit Antibiotic Group', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Edit Antibiotic Group Name', function () {
    //change hospital to test-hospital
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(3000);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()),5000);
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSelectedHospital()),5000);
    browser.driver.sleep(500);
    antimicro.getSelectedHospital().click();
    browser.driver.wait(until.visibilityOf(antimicro.getTestHospital()));
    browser.driver.sleep(1500);
    antimicro.getTestHospital().click();

    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getStagingMode()));
    browser.driver.sleep(500);
    antimicro.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticPage()));
    browser.driver.sleep(500);
    antimicro.getAntibioticPage().click();

    //wait to load hospital
    browser.driver.sleep(5000);

    //Editing Antibiotic Group (always edits second antibiotic group)
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticGroupEdit()));
    browser.driver.sleep(500);
    antimicro.getAntibioticGroupEdit().click();
    browser.driver.sleep(500);
    //to click on alert and make protractor sense it
    antimicro.getRenameAlert().click();
    browser.driver.wait(until.visibilityOf(antimicro.getRenameGroupInput()));
    antimicro.getRenameGroupInput().sendKeys('1');
    browser.driver.sleep(500);
    antimicro.getSAVE().click();

    //check if antibiotic changed name
    expect<any>(antimicro.getAntibioticGroup().getText()).toBe('testAntibioticGroup1');

    //set it to live to save new changes (must be deployed to see it in live)
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(500);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()));
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getLiveMode()));
    browser.driver.sleep(500);
    antimicro.getLiveMode().click();
    browser.driver.sleep(500);
  });

});

describe('Add New Antibiotic', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Add new Antibiotic', function () {
    //change hospital to test-hospital
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(3000);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()),5000);
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSelectedHospital()),5000);
    browser.driver.sleep(500);
    antimicro.getSelectedHospital().click();
    browser.driver.wait(until.visibilityOf(antimicro.getTestHospital()));
    browser.driver.sleep(1500);
    antimicro.getTestHospital().click();

    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getStagingMode()));
    browser.driver.sleep(500);
    antimicro.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticPage()));
    browser.driver.sleep(500);
    antimicro.getAntibioticPage().click();

    //wait to load hospital
    browser.driver.sleep(5000);

    //Adding new antibiotic (always clicks second antibiotic group)
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticGroup()));
    browser.driver.sleep(500);
    antimicro.getAntibioticGroup().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAddAntibioticButton()));
    antimicro.getAddAntibioticButton().click();
    //access alert
    browser.driver.sleep(500);
    antimicro.getAddAntibioticAlert().click();
    browser.driver.wait(until.visibilityOf(antimicro.getNewAntibioticName()));
    antimicro.getNewAntibioticName().sendKeys('testAntibiotic');
    browser.driver.sleep(500);
    antimicro.getAdd().click();

    //check if there's a new antibiotic group
    browser.driver.sleep(500);
    expect<any>(antimicro.getAntibiotic().getText()).toBe('testAntibiotic');

    //set it to live to save new changes (must be deployed to see it in live)
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(500);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()));
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getLiveMode()));
    browser.driver.sleep(500);
    antimicro.getLiveMode().click();
    browser.driver.sleep(500);
  });

});

describe('Edit Antibiotic', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Edit Antibiotic', function () {
    //change hospital to test-hospital
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(3000);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()),5000);
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSelectedHospital()),5000);
    browser.driver.sleep(500);
    antimicro.getSelectedHospital().click();
    browser.driver.wait(until.visibilityOf(antimicro.getTestHospital()));
    browser.driver.sleep(1500);
    antimicro.getTestHospital().click();

    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getStagingMode()));
    browser.driver.sleep(500);
    antimicro.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticPage()));
    browser.driver.sleep(500);
    antimicro.getAntibioticPage().click();

    //wait to load hospital
    browser.driver.sleep(5000);

    //Edit antibiotic (always clicks second antibiotic group and first antibiotic inside)
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticGroup()));
    browser.driver.sleep(500);
    antimicro.getAntibioticGroup().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticEdit()));
    browser.driver.sleep(1000);
    antimicro.getAntibioticEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticDropdown()));
    browser.driver.sleep(500);
    antimicro.getAntibioticDropdown().click();
    browser.driver.wait(until.visibilityOf(antimicro.getOK()));
    browser.driver.sleep(500);
    antimicro.getOK().click();
    browser.driver.wait(until.visibilityOf(antimicro.getEditAntibioticInput()));
    antimicro.getEditAntibioticInput().sendKeys('1');
    browser.driver.sleep(500);
    antimicro.getSAVE().click();

    //check if there's a new antibiotic group
    browser.driver.sleep(500);
    expect<any>(antimicro.getAntibiotic().getText()).toBe('testAntibiotic1');

    //set it to live to save new changes (must be deployed to see it in live)
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(500);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()));
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getLiveMode()));
    browser.driver.sleep(500);
    antimicro.getLiveMode().click();
    browser.driver.sleep(500);
  });

});

describe('Delete Antibiotic', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Delete Antibiotic', function () {
    //change hospital to test-hospital
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(3000);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()),5000);
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSelectedHospital()),5000);
    browser.driver.sleep(500);
    antimicro.getSelectedHospital().click();
    browser.driver.wait(until.visibilityOf(antimicro.getTestHospital()));
    browser.driver.sleep(1500);
    antimicro.getTestHospital().click();

    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getStagingMode()));
    browser.driver.sleep(500);
    antimicro.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticPage()));
    browser.driver.sleep(500);
    antimicro.getAntibioticPage().click();

    //wait to load hospital
    browser.driver.sleep(5000);

    //Delete antibiotic (always clicks second antibiotic group and first antibiotic inside)
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticGroup()));
    browser.driver.sleep(500);
    antimicro.getAntibioticGroup().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticDelete()));
    browser.driver.sleep(1000);
    antimicro.getAntibioticDelete().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDELETE()));
    browser.driver.sleep(1000);
    antimicro.getDELETE().click();

    //check for presence of antibiotic
    browser.driver.sleep(500);
    expect<any>(antimicro.getAntibiotic().isPresent()).toBe(false);

    //set it to live to save new changes (must be deployed to see it in live)
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(500);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()));
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getLiveMode()));
    browser.driver.sleep(500);
    antimicro.getLiveMode().click();
    browser.driver.sleep(500);
  });

});

describe('Delete Antibiotic Group', () => {

  browser.waitForAngularEnabled(false);
  beforeEach(() => {
    antimicro.browseToPage();
  });

  it('Should Delete Antibiotic Group', function () {
    //change hospital to test-hospital
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(3000);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()),5000);
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSelectedHospital()),5000);
    browser.driver.sleep(500);
    antimicro.getSelectedHospital().click();
    browser.driver.wait(until.visibilityOf(antimicro.getTestHospital()));
    browser.driver.sleep(1500);
    antimicro.getTestHospital().click();

    //Turning 'Staging' mode on
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getStagingMode()));
    browser.driver.sleep(500);
    antimicro.getStagingMode().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticPage()));
    browser.driver.sleep(500);
    antimicro.getAntibioticPage().click();

    //wait to load hospital
    browser.driver.sleep(5000);

    //Deleting Antibiotic Group
    browser.driver.wait(until.visibilityOf(antimicro.getAntibioticGroupDelete()));
    browser.driver.sleep(500);
    antimicro.getAntibioticGroupDelete().click();
    browser.driver.sleep(500);
    //to click on alert and make protractor sense it
    antimicro.getDeleteGroupAlert().click();
    antimicro.getDeleteAlert().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDELETE()));
    browser.driver.sleep(500);
    antimicro.getDeleteGroupAlert().click();
    antimicro.getDeleteRadioButton().click();
    antimicro.getDELETE().click();

    //check for presence of antibiotic group
    browser.driver.sleep(500);
    expect<any>(antimicro.getAntibioticGroup().isPresent()).toBe(false);

    //set it to live to save new changes (must be deployed to see it in live)
    browser.driver.wait(until.visibilityOf(antimicro.getMenu()));
    browser.driver.sleep(500);
    antimicro.getMenu().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettings()));
    browser.driver.sleep(500);
    antimicro.getSettings().click();
    browser.driver.wait(until.visibilityOf(antimicro.getSettingsEdit()));
    browser.driver.sleep(500);
    antimicro.getSettingsEdit().click();
    browser.driver.wait(until.visibilityOf(antimicro.getDatabase()));
    browser.driver.sleep(500);
    antimicro.getDatabase().click();
    browser.driver.wait(until.visibilityOf(antimicro.getLiveMode()));
    browser.driver.sleep(500);
    antimicro.getLiveMode().click();
    browser.driver.sleep(500);

    logout();
  });

});
