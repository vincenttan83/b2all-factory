import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        const checked = (control as FormArray).length;

        if (checked < minRequired) {
            return { minChecked: { requiredLength: minRequired, checkedLenght: checked } };
        }

        return null;
    };
    //     return function validate(formGroup: FormGroup) {
    //         let checked = 0;

    //         Object.keys(formGroup.controls).forEach(key => {
    //             const control = formGroup.controls[key];

    //             if (control.value === true) {
    //                 checked++;
    //             }
    //         });

    //         if (checked < minRequired) {
    //             return {
    //                 requireCheckboxesToBeChecked: true,
    //             };
    //         }

    //         return null;
    //     };
}
