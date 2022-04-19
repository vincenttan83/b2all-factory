import { EFieldConfigInputType } from '../enums/field-config-input-type.enum';
import { EFieldConfigType } from '../enums/field-config-type.enum';
import { IFieldConfigBased } from './field-config.interface';
import { IKeyValueInString } from './key-value.interface';

export interface IFieldConfigForInputConfig extends IFieldConfigBased {
    type: EFieldConfigType.Input;
    type_config: IInputConfig;
}

export interface IInputConfig {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly
     */
    readonly?: boolean;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
     */
    type: EFieldConfigInputType;
    /**
     * For Checkbox and Radio list
     */
    list?: boolean;
    /**
     * When list is true, this field is use
     */
    dataset?: IKeyValueInString[];
    input_helper?: boolean;
    /**
     * When list is false and is Checkbox, text will display beside checkbox 
     */
    single_checkbox_display_text?: string;
    css_class: {
        /**
         * class for group label
         * only for list or checkbox
         * leave empty string if not needed
         */
        group_label: string;
        /**
         * wrapper class for input
         * @example 'form-group'
         */
        group: string;
        /**
         * class for input label
         */
        input_label: string;
        /**
         * class for input label
         * @example 'form-control'
         */
        input: string;
    };
    /**
     * If placeholder is set, it will be used and display_text will be ignored
     */
    placeholder?: string;
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
