import { EFieldConfigType } from "../enums/field-config-type.enum";
import { IFieldConfig, IFieldConfigBased } from "./field-config.interface";
import { IKeyValueInString } from "./key-value.interface";

export interface IFieldConfigForArrayConfig extends IFieldConfigBased {
    type: EFieldConfigType.Array;
    type_config: IArrayConfig;
}

export interface IArrayConfig {
    hierarchy_level?: {
        cur_level: number;
        max_level: number;
    };
    field_configs: IFieldConfig[];
    css_class: {
        /**
         * Class for Add button
         * @example 'btn btn-primary'
         */
        add_button: string;
        /**
         * Class for Delete button
         * @example 'btn btn-danger'
         */
        del_button: string;
        // group: string;
        // group_label: string;
        // label: string;
    };
    /**
     * Configuration for recursive enabled tempalte
     */
    table_column_names?: string[];
    table_column_width?: string[];
    table_caption?: string;
    /**
     * to have a trailing column as radio button for "default" as option from the array list
     */
    enable_default_options?: IKeyValueInString[];
    hideAddButton?: boolean;
    hideRemoveRowItemButton?: boolean;
}

export function isFieldConfigForArrayConfig(obj: any): obj is IFieldConfigForArrayConfig {
    return (
        obj !== null &&
        obj.field_configs !== null &&
        typeof obj.field_configs === 'object'
    );
}
