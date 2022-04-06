import { ValidatorFn } from '@angular/forms';
import { EFieldConfigType } from '../enums/field-config-type.enum';
import { IFieldConfigBased } from './field-config.interface';
import { IMultiSelect } from './multi-select.interface';

export interface IFieldConfigForSelectConfig extends IFieldConfigBased {
    type: EFieldConfigType.Select;
    type_config: ISelectConfig;
}

export interface ISelectConfig {
    /**
     * Only accept dataset in the outer join manner for
     * dependant combo box
     */
    dataset: IMultiSelect[];
    controls: {
        name: string;
        type?: 'select' | 'datalist';
        label?: string;
        key_field: string;
        value_field: string;
        value: string | null;
        validation_fn?: ValidatorFn[];
        disabled?: boolean;
        placeholder?: string;
    }[];
    css_class: {
        group: string;
        select_label: string;
        select: string;
    };
}

export function isFieldConfigForSelectConfig(obj: any): obj is IFieldConfigForSelectConfig {
    return (
        obj !== null &&
        obj.dataset !== null &&
        typeof obj.dataset === 'object' &&
        obj.controls !== null &&
        typeof obj.controls === 'object'
    );
}
