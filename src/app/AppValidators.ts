import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default {
  sameTo(otherControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === otherControl.value ? null : { sameTo: { validatedValue: control.value, otherValue: otherControl.value } };
    };
  }
};
