import { EFieldConfigType } from "../enums/field-config-type.enum";
import { IFieldConfigBased } from "./field-config.interface";

export interface IFieldConfigForButtonConfig extends IFieldConfigBased {
    type: EFieldConfigType.Button;
    type_config: IButtonConfig;
}

export interface IButtonConfig {
    type: 'button' | 'submit'; // reset should be just refresh the page
    onclick_fn?: () => Promise<void>;
    loading_text?: string;
    css_class: {
        group: string;
        button: string;
        spinner?: string;
    };
}

export function isFieldConfigForButtonConfig(obj: any): obj is IFieldConfigForButtonConfig {
    return (
        obj !== null &&
        (obj.type === 'button' || obj.type === 'submit') &&
        (typeof obj.onclick_fn === 'undefined' || typeof obj.onclick_fn === 'function')
    );
}
