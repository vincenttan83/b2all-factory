import { IFieldConfig } from './field-config.interface';

export interface IFieldConfigForArrayConfig {
    templates: {
        field_configs: IFieldConfig[]
    }[];
    addable: boolean;
}

export function isFieldConfigForArrayConfig(obj: any): obj is IFieldConfigForArrayConfig {
    return (
        obj !== null &&
        obj.templates !== null &&
        typeof obj.templates === 'object'
    );
}
