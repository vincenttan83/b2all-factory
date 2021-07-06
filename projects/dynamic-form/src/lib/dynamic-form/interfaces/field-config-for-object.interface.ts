import { IFieldConfig } from './field-config.interface';

export interface IFieldConfigForObjectConfig<T> {
    field_configs: IFieldConfig<T>[];
    css_class: {
        group_label: string;
        content: string;
    };
}

export function isFieldConfigForObjectConfig<T>(obj: any): obj is IFieldConfigForObjectConfig<T> {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
