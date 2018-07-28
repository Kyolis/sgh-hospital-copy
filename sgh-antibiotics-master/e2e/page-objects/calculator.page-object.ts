import { browser, element, by, ElementFinder } from 'protractor';

export class CalculatorPageObject{

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


  getCockroftDropdown(){
  return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[1]/ion-item/div[1]/div/ion-label/h2/strong'));
  }

  getCockroftGenderOption(){
    return element(by.className('item-cover item-cover-md item-cover-default item-cover-default-md'));
  }

  getMale(){
    return element(by.buttonText('Male'));
  }

  getFemale(){
    return element(by.buttonText('Female'));
  }

  getCockroftAge(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[1]/form/div/div/ion-list/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getCockroftWeight(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[1]/form/div/div/ion-list/ion-item[3]/div[1]/div/ion-input/input'));
  }

  getCockroftSerum(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[1]/form/div/div/ion-list/ion-item[4]/div[1]/div/ion-input/input'));
  }

  getCockroftValue(){
    return element(by.xpath('//*[@id="cgeUnit"]'));
  }

  getMenuButton(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-antibiotics-overview/ion-header/ion-navbar/button[2]'));
  }

  getCalculatorPage(){
    return element(by.buttonText('Calculator'));
  }

  getIdealBodyWeightDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[2]/ion-item/div[1]/div/ion-label/h2/strong'));
  }

  getIdealBodyWeightGenderOption(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[2]/form/div/div/ion-list/ion-item[1]/div[1]/div/ion-select'));
  }

  getIdealBodyWeightHeight(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[2]/form/div/div/ion-list/ion-item[2]/div[1]/div/ion-input/input'));
    //return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[3]/form/div/div/ion-list/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getIdealBodyWeightValue(){
    return element(by.xpath('//*[@id="ibwUnit"]'));
  }

  getAdjustedBodyWeightDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[3]/ion-item'));
  }

  getAdjustedBodyWeightHeight(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[3]/form/div/div/ion-list/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getAdjustedBodyWeightWeight(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[3]/form/div/div/ion-list/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getAdjustedBodyWeightValue(){
    return element(by.xpath('//*[@id="abwUnit"]'));
  }

  getBodySurfaceAreaDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[4]/ion-item/div[1]/div/ion-label/h2/ion-icon'));
  }

  getBodySurfaceAreaHeight(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[4]/form/div/div/ion-list/ion-item[1]/div[1]/div/ion-input/input'));
  }

  getBodySurfaceAreaWeight(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[4]/form/div/div/ion-list/ion-item[2]/div[1]/div/ion-input/input'));
  }

  getBodySurfaceAreaValue(){
    return element(by.xpath('//*[@id="bsaUnit"]'));
  }

  getCURBDropdown(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[5]/ion-item/div[1]/div/ion-label/h2/ion-icon'));
  }

  getConfusion(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[5]/form/div/div/ion-list/ion-item[1]/ion-checkbox'));
  }

  getUrea(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[5]/form/div/div/ion-list/ion-item[2]/ion-checkbox'));
  }

  getRR(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[5]/form/div/div/ion-list/ion-item[3]/ion-checkbox'));
  }

  getSBP(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[5]/form/div/div/ion-list/ion-item[4]/ion-checkbox'));
  }

  getCURBAge(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[5]/form/div/div/ion-list/ion-item[5]/ion-checkbox'));
  }

  getCURBvalue(){
    return element(by.xpath('/html/body/ion-app/ng-component/ion-split-pane/ion-nav/page-calculator/ion-content/div[2]/ion-list[5]/form/div/div/ion-card/ion-card-content'));
    //return element(by.cssContainingText('card-content card-content-md','Points ='));
    //return element(by.binding('{{ count }}'));
  }

}

