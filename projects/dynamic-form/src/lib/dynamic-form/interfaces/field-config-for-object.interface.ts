import { EFieldConfigType } from '../enums/field-config-type.enum';
import { IFieldConfig, IFieldConfigBased } from './field-config.interface';

export interface IFieldConfigForObjectConfig extends IFieldConfigBased {
    type: EFieldConfigType.Object;
    type_config: IObjectConfig;
}

export interface IObjectConfig {
    field_configs: IFieldConfig[];
    css_class: {
        group_label: string;
        content: string;
    };
}

export function isFieldConfigForObjectConfig(obj: any): obj is IFieldConfigForObjectConfig {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
