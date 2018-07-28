import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * The calculator UI
 */
@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {

  shownGroup = null;
  calculators: String[] = ["Cockroft-Gault Equation", "Ideal Body Weight", "Adjusted Body Weight", "Body Surface Area", "CURB-65"];

  // input fields
  gender: string;
  age: number;
  weight: number;
  height: number;
  scr: number;
  count: number;

  // calculated columns
  cge: number;
  ibw: number;
  abw: number;
  bsa: number;
  CURBdesc: string;

  // errorMsg
  calculatorForm: FormGroup;
  ageError: string;
  heightError: string;
  weightError: string;
  scrError: string;
  private cgeOnly: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public navParams: NavParams,
              private viewCtrl: ViewController) {

    this.gender = 'Male';

    this.calculatorForm = this.formBuilder.group({
      gender: new FormControl('', []),
      age: new FormControl('', [Validators.min(0), Validators.max(123)]),
      weight: new FormControl('', [Validators.min(0), Validators.max(450)]),
      height: new FormControl('', [Validators.min(0), Validators.max(250)]),
      scr: new FormControl('', [])
    });

    if (this.navParams.get('openCockroftOnly')) {
      this.toggleGroup(0);
      this.cgeOnly = true;
    }
  }

  /**
   * Open/close calculator item.
   * @param group  Index of the group.
   */
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
      this.count = 0;
      this.CURBdesc = null;
    }
  };

  /**
   * Check group shown status.
   * @param group  Index of the group.
   * @returns  Index of the group.
   */
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  /**
   * Calculate formulas according to user input.
   */
  public inputChange() {
    this.validateAge();
    this.validateHeight();
    this.validateWeight();
    this.validateScr();

    if (this.validateAge() && this.validateWeight() && this.validateScr()) {
      this.calculateCGE();
    }
    if (this.validateHeight()) {
      this.calculateIBW();
    }
    if (this.validateHeight() && this.validateWeight()) {
      this.calculateABW();
      this.calculateBSA();
    }
  }

  /**
   * Validation for age.
   * @returns {boolean}  True(-1 > age > 123) or false.
   */
  validateAge(): boolean {
    if (this.age <= 0) {
      this.ageError = "Age cannot be less than or equals 0!";
      return false;
    } else if (this.age > 123) {
      this.ageError = "Age cannot be more than 123!";
      return false;
    } else {
      this.ageError = null;
      return true;
    }
  }

  /**
   * Validation for height.
   * @returns {boolean}  True(-1 > height > 450) or false.
   */
  validateHeight(): boolean {
    if (this.height <= 0) {
      this.heightError = "Height cannot be less than or equals 0!";
      return false;
    } else if (this.height > 450) {
      this.heightError = "Height cannot be more than 450!";
      return false;
    } else {
      this.heightError = null;
      return true;
    }
  }

  /**
   * Validation for weight.
   * @returns {boolean}  True(-1 > weight > 250) or false.
   */
  validateWeight(): boolean {
    if (this.weight <= 0) {
      this.weightError = "Weight cannot be less than or equals 0!";
      return false;
    } else if (this.weight > 250) {
      this.weightError = "Weight cannot be more than 250!";
      return false;
    } else {
      this.weightError = null;
      return true;
    }
  }

  /**
   * Validation for src.
   * @returns {boolean}  True(src > 0) or false(src < 0).
   */
  validateScr(): boolean {
    if (this.scr <= 0) {
      this.scrError = "Serum Creatinine cannot be less than or equals 0!";
      return false;
    } else {
      this.scrError = null;
      return true;
    }
  }

  /**
   * Calculate CGE.
   */
  calculateCGE() {
    if (this.gender === 'Female') {
      this.cge = ((140 - this.age) * this.weight * 0.85 * 1.23) / this.scr;
    } else {
      this.cge = ((140 - this.age) * this.weight * 1.23) / this.scr;
    }
  }

  /**
   * Calculate IBW.
   */
  calculateIBW() {
    if (this.height) {
      if (this.height > 152.4) {
        this.ibw = ((this.height - 152.4) / 2.54) * 2.3;
        if (this.gender === 'Female') {
          this.ibw += 45.5;
        } else {
          this.ibw += 50;
        }
      } else {
        if (this.gender === 'Female') {
          this.ibw = 45.5;
        } else {
          this.ibw = 50;
        }
      }
    } else {
      this.ibw = null;
    }
  }

  /**
   * Calculate ABW.
   */
  calculateABW() {
    const value = this.ibw + (0.4 * (this.weight - this.ibw));
    if (this.weight > (1.3 * this.ibw)) {
      this.abw = value;
    } else {
      this.abw = null;
    }
  }

  /**
   * Calculate BSA.
   */
  calculateBSA() {
    this.bsa = 0.007184 * Math.pow(this.height, 0.725) * Math.pow(this.weight, 0.425);
  }

  /**
   * Calculate CRUB.
   * @param event  id and checked(whether the checkbox is checked).
   */
  calculateCURB(event) {
    if (event.checked) {
      this.count++;
    }
    else {
      this.count--;
    }

    if (this.count == 1) {
      this.CURBdesc = 'Low severity (risk of death < 3%). Outpatient therapy is usually appropriate.'
    } else if (this.count == 2) {
      this.CURBdesc = 'Moderate severity (risk of death < 9%). Hospitalization should be considered, or hospital-supervised outpatient treatment.'
    } else if (this.count == 3) {
      this.CURBdesc = 'High severity (risk of death 16%). Hospitalization is indicated, with prompt clinical review.'
    } else if (this.count == 4) {
      this.CURBdesc = 'High severity (risk of death 37%). Hospitalization is indicated, and the patient should be assessed for possible intensive care unit admission.'
    } else if (this.count == 5) {
      this.CURBdesc = 'High severity (risk of death 20-40%). Hospitalization is indicated, and the patient should be assessed for possible intensive care unit admission.'
    } else {
      this.CURBdesc = null;
    }

  }

  returnCge() {
    this.viewCtrl.dismiss({cockcroft: this.cge});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
