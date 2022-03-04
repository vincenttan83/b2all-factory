import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { IFieldConfigForArrayConfig } from './field-config-for-array.interface';
import { IFieldConfigForButtonConfig } from './field-config-for-button.interface';
import { IFieldConfigForDividerConfig } from './field-config-for-divider.interface';
import { IFieldConfigForInputConfig } from './field-config-for-input.interface';
import { IFieldConfigForObjectConfig } from './field-config-for-object.interface';
import { IFieldConfigForRadioButtonDefaultConfig } from './field-config-for-radiobuttondefault.interface';
import { IFieldConfigForSelectConfig } from './field-config-for-select.interface';
import { IFieldConfigForTextareaConfig } from './field-config-for-textarea.interface';

export type IFieldConfig =
    | IFieldConfigForArrayConfig
    | IFieldConfigForButtonConfig
    | IFieldConfigForDividerConfig
    | IFieldConfigForInputConfig
    | IFieldConfigForObjectConfig
    | IFieldConfigForRadioButtonDefaultConfig
    | IFieldConfigForSelectConfig
    | IFieldConfigForTextareaConfig

export interface IFieldConfigBased {
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
     * Validation for this control for async
     */
    async_validation_fn?: AsyncValidatorFn[];
    /**
     * Disabled field
     */
    disabled?: boolean;
    /** for field sorting */
    index?: number;
    /** for css class */
    css_class?: string;

}
