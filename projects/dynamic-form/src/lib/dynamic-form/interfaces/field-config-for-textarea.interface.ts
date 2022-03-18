import { EFieldConfigType } from "../enums/field-config-type.enum";
import { IFieldConfigBased } from "./field-config.interface";

export interface IFieldConfigForTextareaConfig extends IFieldConfigBased {
    type: EFieldConfigType.Textarea;
    type_config: ITextareaConfig;
}

export interface ITextareaConfig {
    row_count: number;
    col_count?: number;
    css_class: {
        group: string;
        input_label: string;
        input: string;
    };
    placeholder?: string;
}

export function isFieldConfigForTextareaConfig(obj: any): obj is IFieldConfigForTextareaConfig {
    return (
        obj !== null &&
        typeof obj.row_count === 'number' &&
        (typeof obj.col_count === 'undefined' || typeof obj.col_count === 'number')
    );
}
