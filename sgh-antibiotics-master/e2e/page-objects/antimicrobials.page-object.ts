import { browser, element, by, ElementFinder } from 'protractor';

export class AntimicrobialsPageObject{
  constructor(){

  }
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

  getMiscellaneousDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div/h2/i'));
  }

  getClindamycin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/span'));
  }


  getCotrimoxazole(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[2]/div[1]/div/ion-label/span/span'));
  }

  getDaptomycin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[3]/div[1]/div/ion-label/span/span'));
  }

  getFusidicAcid(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[4]/div[1]/div/ion-label/span/span'));
  }

  getLinezolid(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[5]/div[1]/div/ion-label/span/span'));
  }

  getMetronidazole(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[6]/div[1]/div/ion-label/span/span'));
  }

  getNitrofurantoin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[7]/div[1]/div/ion-label/span/span'));
  }

  getPolymyxinB(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[1]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[8]/div[1]/div/ion-label/span/span'));
  }

  getAdministration(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotic-details/ion-content/div[2]'));
  }

  getAminoglycosidesDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[2]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getAmikacin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[2]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item/div[1]/div/ion-label/span/span'));
  }

  getAntiTuberAgentsDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[3]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getEthambutol(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[3]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/span'));
  }

  getIsoniazid(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[3]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[2]/div[1]/div/ion-label/span/span'));
  }

  getPyrazinamide(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[3]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[3]/div[1]/div/ion-label/span/span'));
  }

  getRifampicin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[3]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[4]/div[1]/div/ion-label/span/span'));
  }

  getStreptomycin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[3]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[5]/div[1]/div/ion-label/span/span'));
  }

  getCarbapenemsDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[4]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getDoripenem(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[4]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span'));
  }

  getErtapenem(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[4]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[2]/div[1]/div/ion-label/span'));
  }

  getImipenemCilastatin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[4]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[3]/div[1]/div/ion-label/span'));
  }

  getMeropenem(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[4]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[4]/div[1]/div/ion-label/span'));
  }

  getCephalosporinsDropddown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getCefalexin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/span'));
  }

  getCefazolin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[2]/div[1]/div/ion-label/span/span'));
  }

  getCefepime(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[3]/div[1]/div/ion-label/span/span'));
  }

  getCefoxitin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[4]/div[1]/div/ion-label/span/span'));
  }

  getCeftaroline(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[5]/div[1]/div/ion-label/span/span'));
  }

  getCeftazidime(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[6]/div[1]/div/ion-label/span/span'));
  }

  getCeftazidimeAvibactam(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[7]/div[1]/div/ion-label/span/span'));
  }

  getCeftriaxone(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[8]/div[1]/div/ion-label/span/span'));
  }

  getCefuroxime(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[5]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[9]/div[1]/div/ion-label/span/span'));
  }

  getGlycopeptideDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[6]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getVancomycin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[6]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item/div[1]/div/ion-label/span/span'))
  }

  getMacrolidesDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[7]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getAzithromycin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[7]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/span'));
  }

  getClarithromycin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[7]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[2]/div[1]/div/ion-label/span/span'));
  }

  getMonobactamDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[8]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getAztreonam(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[8]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item/div[1]/div/ion-label/span/span'))
  }

  getPenicillinsDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getAmoxicillin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/span'));
  }

  getAmoxicillinClavulanate(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[2]/div[1]/div/ion-label/span/span'));
  }

  getAmpicillin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[3]/div[1]/div/ion-label/span/span'));
  }

  getAmpicillinSulbactam(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[4]/div[1]/div/ion-label/span/span'));
  }

  getCloxacillin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[5]/div[1]/div/ion-label/span/span'));
  }

  getCrystallinePenicillinG(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[6]/div[1]/div/ion-label/span/span'));
  }

  getPenicillinV(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[7]/div[1]/div/ion-label/span/span'));
  }

  getPipercillinTazobactam(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[9]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[8]/div[1]/div/ion-label/span/span'));
  }

  getQuinolonesDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[10]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getCiprofloxacin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[10]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/span'));
  }

  getLevofloxacin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[10]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[2]/div[1]/div/ion-label/span/span'));
  }

  getMoxifloxacin(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[10]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[3]/div[1]/div/ion-label/span/span'));
  }

  getTetracyclinesDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[11]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div'));
  }

  getDoxycycline(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[11]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/span'));
  }

  getMinocycline(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[11]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[2]/div[1]/div/ion-label/span/span'));
  }

  getTetracycline(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[11]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[3]/div[1]/div/ion-label/span/span'));
  }

  getTigecycline(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[11]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[4]/div[1]/div/ion-label/span/span'));
  }

  getSearchbar(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-searchbar/div/input'));
  }

  getRenalDoseInput(){
    return element(by.xpath('//*[@id="searchInput"]/div/input'));
  }

  getRenalDoseResult(){
    return element(by.className('dosage-value'));
  }

  getSearchedPyrazinamide(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[3]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item/div[1]/div/ion-label'));
  }

  getCalculatorButton(){
    return element(by.xpath('//*[@id="calculatorShortcut"]/button/span'));
  }

  getCockroftGenderOption(){
    return element(by.xpath('/html/body/ion-app/ion-modal/div/page-calculator/ion-content/div[2]/ion-list[1]/form/div/div/ion-list/ion-item[1]'));
  }

  getMale(){
    return element(by.buttonText('Male'));
  }

  getCockroftAge(){
    return element(by.xpath('/html/body/ion-app/ion-modal/div/page-calculator/ion-content/div[2]/ion-list[1]/form/div/div/ion-list/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getCockroftWeight(){
    return element(by.xpath('/html/body/ion-app/ion-modal/div/page-calculator/ion-content/div[2]/ion-list[1]/form/div/div/ion-list/ion-item[3]/div[1]/div/ion-input/input'));
  }

  getCockroftSerum(){
    return element(by.xpath('/html/body/ion-app/ion-modal/div/page-calculator/ion-content/div[2]/ion-list[1]/form/div/div/ion-list/ion-item[4]/div[1]/div/ion-input/input'));
  }

  getCockroftValue(){
    return element(by.xpath('//*[@id="cgeUnit"]'));
  }

  getMenu(){
    return element(by.className('bar-buttons bar-buttons-md bar-button bar-button-md bar-button-default bar-button-default-md bar-button-menutoggle bar-button-menutoggle-md'));
  }

  getSettings(){
    return element(by.xpath('//*[@id="settings"]/button'));
  }

  getStagingMode(){
    return element(by.buttonText('Staging'));
  }

  getLiveMode(){
    return element(by.buttonText('Live'));
  }

  getDatabase(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[1]/form[2]/ion-item/div[1]/div/ion-select'));
  }

  getSettingsEdit(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[1]/ion-item[1]/div[1]/ion-toggle'));
  }

  getAntibioticPage(){
    return element(by.xpath('//*[@id="regularFuncions"]/button[1]'));
  }

  getAddAntibioticGroupButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/button'));
  }

  getAddAntibioticGroupInput(){
    return element(by.xpath('//*[@id="alert-input-0-0"]'));
  }

  getAddButton(){
    return element(by.buttonText('Add'));
  }

  getSelectedHospital(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-user-settings/ion-content/div[2]/div[1]/form/ion-item/div[1]/div/ion-select'));
  }

  getTestHospital(){
    return element(by.buttonText('test-hospital'))
  }

  getAntibioticGroupEdit(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[2]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div[2]/button[1]/span'));
  }

  getRenameGroupInput(){
    return element(by.className('alert-input ng-pristine ng-valid ng-touched'));
  }

  getSAVE(){
    return element(by.buttonText('Save'))
  }

  getRenameAlert(){
    return element(by.xpath('/html/body/ion-app/ion-alert/div/div[1]'))
  }

  getAntibioticGroupDelete(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[2]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div[2]/button[2]/span'));
  }

  getDeleteAlert(){
    return element(by.xpath('/html/body/ion-app/ion-alert/div'))
  }

  getDELETE(){
    return element(by.buttonText('Delete'))
  }

  getAntibioticGroup(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[2]/antibiotic-group/ion-item/div[1]/div/ion-label/span/div[1]/h2/strong'));
  }

  getAddAntibioticButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[2]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/button'));
  }

  getAddAntibioticAlert(){
    return element(by.className('alert-title'));
  }

  getNewAntibioticName(){
    return element(by.className('alert-input ng-pristine ng-valid ng-touched'));
  }

  getAdd(){
    return element(by.buttonText('Add'));
  }

  getAntibioticEdit(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[2]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/button[1]/span'));
  }

  getAntibioticDropdown(){
    return element(by.xpath('/html/body/ion-app/ion-modal/div/edit-antibiotic/ion-content/div[2]/ion-item[1]/div[1]/div/ion-select'));
  }

  getOK(){
    return element(by.buttonText('OK'));
  }

  getEditAntibioticInput(){
    return element(by.className('text-input text-input-md'));
  }

  getAntibioticDelete(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-content/div[2]/ion-list/div[2]/antibiotic-group/ion-item/div[1]/div/ion-label/div/ion-list/ion-item[1]/div[1]/div/ion-label/span/button[2]/span'));
  }

  getDeleteRadioButton(){
    return element(by.className('alert-checkbox-icon'));
  }

  getAntibiotic(){
    return element(by.className('flex-left clickable'));
  }

  getDeleteGroupAlert(){
    return element(by.xpath('/html/body/ion-app/ion-alert/div'));
  }
}
