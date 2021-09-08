import { IFieldConfig } from './field-config.interface';
import { IKeyValueInString } from './key-value.interface';

export interface IFieldConfigForArrayConfig<T> {
    hierarchy_level?: {
        cur_level: number;
        max_level: number;
    };
    field_configs: IFieldConfig<T>[];
    css_class: {
        add_button: string;
        del_button: string;
        group: string;
        group_label: string;
        label: string;
    };
    /**
     * Configuration for recursive enabled tempalte
     */
    table_column_names?: string[];
    table_caption?: string;
    /**
     * to have a trailing column as radio button for "default" as option from the array list
     */
    enable_default_options?: IKeyValueInString[];
}

export function isFieldConfigForArrayConfig<T>(obj: any): obj is IFieldConfigForArrayConfig<T> {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
