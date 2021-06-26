import { IFieldConfig } from './field-config.interface';

/**
 * For array config
 * We need 3 group of data
 * 1: the configuration
 * 2: the config template
 * 3: the data template
 */
export interface IFieldConfigForArrayConfig {
    // templates: {
    //     field_configs: IFieldConfig[]
    // }[];
    field_configs: IFieldConfig[];
    // saved_datas: { [key: string]: any }[];
    addable: boolean;
}

export function isFieldConfigForArrayConfig(obj: any): obj is IFieldConfigForArrayConfig {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
