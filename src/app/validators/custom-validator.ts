import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {

    /** 
    *  regular expression can be used for password validation or email validation 
    *  validationError object of key and value { [key :string] :any }
    *  (BODY) if the control value is false return null else if regex value is true return null else return error 
    */
    static pattern(regex: RegExp): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return !(control.value) ? null : (regex.test(control.value)) ? null : { invalidPattern: true }
        }
    }

    //return null or no error if the length of the control after trimming is less than 4 and no space in between */
    static minLength(formLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return (!(control.value?.trim().length < formLength)) ? null : { minLength: true }
        }
    }

    /**  if the length of characters is still 0 after removing the leading and trailing spaces , we have white space */
    static notOnlyWhiteSpaces(control: AbstractControl): ValidationErrors | null {
        return !(control.value?.trim().length === 0 && control.value != null) ? null : { notOnlyWhiteSpaces: true }
    }

    // only digits and length must be exactly for example length of 4 not greater and not smaller 
    static onlyDigits(lengthExactly: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value.match(new RegExp(`^[0-9]{${lengthExactly}}$`)) ? null : { onlyDigits: true }
        }
    }

    static notEqualTo(select :String): ValidatorFn {
        return (control :AbstractControl) : ValidationErrors | null => {
            return control.value !== select ? null : {notEqualTo : true}
        }
    }

    //if the control has any white space in between of characters return true
    static noSpacesInBetween(control: AbstractControl): Boolean {
        return control.value.indexOf(' ') !== -1
    }



    static onlyCharacter(control: AbstractControl): Boolean {
        return control.value.match(/^[a-z]+$/) != null;
    }

}

