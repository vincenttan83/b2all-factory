import { EFormValidatorValueExist, EFormValidatorWithNothing, EFormValidatorWithNumber } from '../enums/form-validator.enum';
import { IMultiSelect } from './multi-select.interface';

interface ICustomValidatorValueExist {
    type: EFormValidatorValueExist;
    param: { keys: string[], datasets: IMultiSelect[] };
}

interface ICustomValidatorNumberParam {
    type: EFormValidatorWithNumber;
    param: number;
}

interface ICustomValidatorWithNothing {
    type: EFormValidatorWithNothing;
}

export type ICustomFormConfigValidator =
    | ICustomValidatorValueExist
    | ICustomValidatorNumberParam
    | ICustomValidatorWithNothing;
