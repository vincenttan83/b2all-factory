import { AbstractControl, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { EFormValidator } from '../enums/form-validator.enum';
import { ICustomFormConfigValidator } from '../interfaces/custom-form-config-validator.interface';
import { IMultiSelect } from '../interfaces/multi-select.interface';

export function requireMinCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        const checked = (control as FormArray).length;

        if (checked < minRequired) {
            return { message: `At least ${minRequired} checked required. ${(minRequired - checked)} more to go.` };
        }

        return null;
    };
}

export function requireMaxCheckboxesToBeCheckedValidator(maxRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        const checked = (control as FormArray).length;

        if (checked > maxRequired) {
            return { message: `Max support ${maxRequired} checked. Over ${(checked - maxRequired)} checked detected.` };
        }

        return null;
    };
}

export function requiredMinWordCountValidator(minRequired = 1): ValidatorFn {
    return (control: AbstractControl) => {
        if (control.value) {
            const count = (control.value as string).split(' ').length;
            if (count < minRequired) {
                return { message: `At least ${minRequired} words required. ${(minRequired - count)} more word(s) to go.` };
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
                return { message: `Max support ${maxRequired} words. Over ${(count - maxRequired)} word(s) detected.` };
            }
        }
        return null;
    };
}

export const valueExistValidator = (keys: string[], datasets: IMultiSelect[]): ValidatorFn => {
    return (control: AbstractControl) => {
        if (control.value) {
            if (keys.length > 0) {
                const a = recursiveMultiselectFind(control.value, keys, datasets, 0);
                return a;
            }
        }
        return null;
    };
};

const recursiveMultiselectFind =
    (controlValue: { [s: string]: any }, keys: string[], datasets: IMultiSelect[], index: number)
        : { [s: string]: any } | null => {
        const found = datasets?.find(data => {
            return data.value === controlValue[keys[index]];
        });
        if (!found) {
            return { message: `Invalid ${keys[index]}`, field_name: keys[index] };
        }
        if (keys.length - 1 === index) {
            return null;
        } else {
            // tslint:disable-next-line: no-non-null-assertion
            return recursiveMultiselectFind(controlValue, keys.slice(0), found.children!, index + 1);
        }
    };

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
                    validatorFunctions.push(requireMinCheckboxesToBeCheckedValidator(element.param));
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
                    validatorFunctions.push(requiredMinWordCountValidator(element.param));
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
            case EFormValidator.ValueExist: {
                if (element) {
                    validatorFunctions.push(valueExistValidator(element.param.keys, element.param.datasets));
                    break;
                } else {
                    throw new Error(`Validator Error`);
                }
            }
        }
    });
    return validatorFunctions;
}
