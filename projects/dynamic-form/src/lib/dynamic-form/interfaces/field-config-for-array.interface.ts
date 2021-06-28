import { IFieldConfig } from './field-config.interface';

export interface IFieldConfigForArrayConfig {
    field_configs: IFieldConfig[];
}

export function isFieldConfigForArrayConfig(obj: any): obj is IFieldConfigForArrayConfig {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
