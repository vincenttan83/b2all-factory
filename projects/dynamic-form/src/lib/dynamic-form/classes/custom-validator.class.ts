import { AbstractControl, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { EFormValidator } from '../enums/form-validator.enum';
import { ICustomFormConfigValidator } from '../interfaces/custom-form-config-validator.interface';

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        const checked = (control as FormArray).length;

        if (checked < minRequired) {
            return { minChecked: { requiredLength: minRequired, checkedLenght: checked } };
        }

        return null;
    };
}

export function requireMaxCheckboxesToBeCheckedValidator(maxRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        const checked = (control as FormArray).length;

        if (checked > maxRequired) {
            return { maxChecked: { requiredLength: maxRequired, checkedLenght: checked } };
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

export function requiredMaxWordCountValidator(maxRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        if (control.value) {
            const count = (control.value as string).split(' ').length;
            if (count > maxRequired) {
                return { maxCount: { requiredCount: maxRequired, checkedCount: count } };
            }
        }
        return null;
    };
}

function getValidatorConfigErrorMessage(whatToValidate: string): string {
    return `${whatToValidate} validator required a number param value to be validated!`;
}

export function getValidators(choice: ICustomFormConfigValidator[]): ValidatorFn[] {
    const validatorFunctions: ValidatorFn[] = [];
    choice.forEach(element => {
        switch (element.type) {
            case EFormValidator.Required: {
                validatorFunctions.push(Validators.required);
                break;
            }
            case EFormValidator.RequiredTrue: {
                validatorFunctions.push(Validators.requiredTrue);
                break;
            }
            case EFormValidator.Email: {
                validatorFunctions.push(Validators.email);
                break;
            }
            case EFormValidator.Min: {
                if (element.param) {
                    validatorFunctions.push(Validators.min(element.param));
                    break;
                } else {
                    throw new Error(getValidatorConfigErrorMessage('Min'));
                }
            }
            case EFormValidator.Max: {
                if (element.param) {
                    validatorFunctions.push(Validators.max(element.param));
                    break;
                } else {
                    throw new Error(getValidatorConfigErrorMessage('Max'));
                }
            }
            case EFormValidator.MinLength: {
                if (element.param) {
                    validatorFunctions.push(Validators.minLength(element.param));
                    break;
                } else {
                    throw new Error(getValidatorConfigErrorMessage('Min length'));
                }
            }
            case EFormValidator.MaxLength: {
                if (element.param) {
                    validatorFunctions.push(Validators.maxLength(element.param));
                    break;
                } else {
                    throw new Error(getValidatorConfigErrorMessage('Min length'));
                }
            }
            case EFormValidator.MinChecked: {
                if (element.param) {
                    validatorFunctions.push(requireCheckboxesToBeCheckedValidator(element.param));
                    break;
                } else {
                    throw new Error(getValidatorConfigErrorMessage('Min checked'));
                }
            }
            case EFormValidator.MaxChecked: {
                if (element.param) {
                    validatorFunctions.push(requireMaxCheckboxesToBeCheckedValidator(element.param));
                    break;
                } else {
                    throw new Error(getValidatorConfigErrorMessage('Max checked'));
                }
            }
            case EFormValidator.MinCount: {
                if (element.param) {
                    validatorFunctions.push(requiredWordCountValidator(element.param));
                    break;
                } else {
                    throw new Error(getValidatorConfigErrorMessage('Min count'));
                }
            }
            case EFormValidator.MaxCount: {
                if (element.param) {
                    validatorFunctions.push(requiredMaxWordCountValidator(element.param));
                    break;
                } else {
                    throw new Error(getValidatorConfigErrorMessage('Max count'));
                }
            }
        }
    });
    return validatorFunctions;
}
