import { ValidatorFn } from '@angular/forms';
import { EFieldConfigType } from '../enums/field-config-type.enum';
import { IFieldConfigForArrayConfig } from './field-config-for-array.interface';
import { IFieldConfigForButtonConfig } from './field-config-for-button.interface';
import { IFieldConfigForInputConfig } from './field-config-for-input.interface';
import { IFieldConfigForObjectConfig } from './field-config-for-object.interface';
import { IFieldConfigForSelectConfig } from './field-config-for-select.interface';
import { IFieldConfigForTextareaConfig } from './field-config-for-textarea.interface';

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
    type_config: null
    | IFieldConfigForArrayConfig
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
