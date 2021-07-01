import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        const checked = (control as FormArray).length;

        if (checked < minRequired) {
            return { minChecked: { requiredLength: minRequired, checkedLenght: checked } };
        }

        return null;
    };
}
