import { EFieldConfigInputType } from '../enums/field-config-input-type.enum';
import { IKeyValueInString } from './key-value.interface';

export interface IFieldConfigForInputConfig {
    type: EFieldConfigInputType;
    list: boolean;
    dataset?: IKeyValueInString[];
    input_helper?: boolean;
}

export function isFieldConfigForInputConfig(obj: any): obj is IFieldConfigForInputConfig {
    return (
        obj !== null &&
        typeof obj.type === 'string' &&
        (typeof obj.input_helper === 'undefined' || typeof obj.input_helper === 'boolean')
    );
}
