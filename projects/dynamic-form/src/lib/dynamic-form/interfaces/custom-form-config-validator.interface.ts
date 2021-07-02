import { EFormValidator } from '../enums/form-validator.enum';

export interface ICustomFormConfigValidator {
    type: EFormValidator;
    param?: number;
}
