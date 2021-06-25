import { IFieldConfig } from './field-config.interface';

export interface IFieldConfigForObjectConfig {
    field_configs: IFieldConfig[];
}

export function isFieldConfigForObjectConfig(obj: any): obj is IFieldConfigForObjectConfig {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
