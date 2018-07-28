import { AbstractControl } from '@angular/forms';

/**
 * Checks if the two provided passwords are the same.
 */
export class PasswordValidation {

  /**
   * Compares if password and comfirmPassword is identical
   * @param {AbstractControl} AC
   * @param {string} passwordFieldName1
   * @param {string} passwordFieldName2
   * @returns {null}
   * @constructor
   */
  static MatchPassword(AC: AbstractControl, passwordFieldName1 = 'password', passwordFieldName2 = 'confirmPassword') {
    let password = AC.get(passwordFieldName1).value; // to get value in input tag
    let confirmPassword = AC.get(passwordFieldName2).value; // to get value in input tag
    if(password != confirmPassword) {
      AC.get(passwordFieldName2).setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }
}
