import { ValidatorFn } from '@angular/forms';
import { EFieldConfigInputType } from './field-config-input-type.enum';
import { EFieldConfigType } from './field-config-type.enum';

export interface IFieldConfig {
    /**
     * Name of the field to be store into database as the field name
     */
    name: string;
    /** Display text */
    display_text?: string;
    /**
     * Value of this control, only for single object
     */
    value?: any;
    /**
     * Validation for this control
     */
    validation_fn?: ValidatorFn[];
    /**
     * The field type to be render on the form
     * such as button, input, array of input or objects,
     * or field of objects
     */
    type: EFieldConfigType;
    type_config: IFieldConfigForArrayConfig
    | IFieldConfigForButtonConfig
    | IFieldConfigForInputConfig
    | IFieldConfigForObjectConfig
    | IFieldConfigForSelectConfig
    | IFieldConfigForTextareaConfig;
    /**
     * Disabled field
     */
    disabled?: boolean;
    /** for field sorting */
    index?: number;
    /** for css class */
    ng_class?: string;

}

export interface IFieldConfigForArrayConfig {
    field_configs: IFieldConfig[];
}

export interface IFieldConfigForButtonConfig {
    type: 'button' | 'reset' | 'submit';
    onclick_fn?: () => Promise<void>;
}

export interface IFieldConfigForInputConfig {
    type: EFieldConfigInputType;
    input_helper?: boolean;
}

export interface IFieldConfigForObjectConfig {
    field_configs: IFieldConfig[];
}

export interface IFieldConfigForSelectConfig {
    dataset: any[];
    /** To auto select based on saved data supply */
    render_dataload: boolean;
}

export interface IFieldConfigForTextareaConfig {
    row_count: number;
}
