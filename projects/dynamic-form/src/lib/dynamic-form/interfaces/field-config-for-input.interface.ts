import { EFieldConfigInputType } from '../enums/field-config-input-type.enum';
import { IKeyValueInString } from './key-value.interface';

export interface IFieldConfigForInputConfig {
    readonly?: boolean;
    type: EFieldConfigInputType;
    list?: boolean;
    dataset?: IKeyValueInString[];
    input_helper?: boolean;
    single_checkbox_display_text?: string;
    css_class: {
        group_label: string;
        group: string;
        input_label: string;
        input: string;
    };
}

export function isFieldConfigForInputConfig(obj: any): obj is IFieldConfigForInputConfig {
    return (
        obj !== null &&
        typeof obj.type === 'string' &&
        // typeof obj.list === 'boolean' &&
        (typeof obj.dataset === 'undefined' || typeof obj.dataset === 'object') &&
        (typeof obj.input_helper === 'undefined' || typeof obj.input_helper === 'boolean') &&
        (typeof obj.single_checkbox_display_text === 'undefined' || typeof obj.single_checkbox_display_text === 'string')
    );
}
