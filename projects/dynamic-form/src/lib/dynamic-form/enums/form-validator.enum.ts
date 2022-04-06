export enum EFormValidatorWithNothing {
    Required = 'required',
    RequiredTrue = 'required_true',
    Email = 'email',
}

export enum EFormValidatorWithNumber {
    MinLength = 'min_length',
    MaxLength = 'max_length',
    Min = 'min',
    Max = 'max',
    MinChecked = 'min_checked',
    MaxChecked = 'max_checked',
    MinCount = 'min_count',
    MaxCount = 'max_count',
}

export enum EFormValidatorValueExist {
    ValueExist = 'value_exist',
}

export type EFormValidator = EFormValidatorWithNothing | EFormValidatorWithNumber | EFormValidatorValueExist;
export const EFormValidator = { ...EFormValidatorWithNothing, ...EFormValidatorWithNumber, ...EFormValidatorValueExist };

