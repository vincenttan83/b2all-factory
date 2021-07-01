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

export function requiredWordCountValidator(minRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        if (control.value) {
            const count = (control.value as string).split(' ').length;

            if (count < minRequired) {
                return { minCount: { requiredCount: minRequired, checkedCount: count } };
            }

        }
        return null;
    };
}
