import { ValidatorFn } from '@angular/forms';
import { EFieldConfigType } from '../enums/field-config-type.enum';

export interface IFieldConfig<T> {
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
    type_config: T;
    /**
     * Disabled field
     */
    disabled?: boolean;
    /** for field sorting */
    index?: number;
    /** for css class */
    ng_class?: string;

}
