import { IFieldConfig } from './field-config.interface';

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
}

export function isFieldConfigForArrayConfig<T>(obj: any): obj is IFieldConfigForArrayConfig<T> {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
