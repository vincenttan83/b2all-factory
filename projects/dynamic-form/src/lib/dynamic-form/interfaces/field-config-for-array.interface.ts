import { IFieldConfig } from './field-config.interface';

export interface IFieldConfigForArrayConfig<T> {
    field_configs: IFieldConfig<T>[];
}

export function isFieldConfigForArrayConfig<T>(obj: any): obj is IFieldConfigForArrayConfig<T> {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
