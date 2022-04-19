import { EFieldConfigType } from "../enums/field-config-type.enum";
import { IFieldConfigBased } from "./field-config.interface";

export interface IFieldConfigForButtonConfig extends IFieldConfigBased {
    type: EFieldConfigType.Button;
    type_config: IButtonConfig;
}

export interface IButtonConfig {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
     */
    type: 'button' | 'submit' | 'reset';
    onclick_fn?: () => Promise<void>;
    /**
     * Button loading text
     * @default 'Please wait...'
     */
    loading_text?: string;
    css_class: {
        /**
         * Wrapper class for button
         * @example 'd-grid gap-2 d-md-flex justify-content-md-end mt-3'
         */
        group: string;
        /**
         * Button cclass
         * @example 'btn btn-primary'
         * @see https://getbootstrap.com/docs/5.1/components/buttons/
         */
        button: string;
        /**
         * spinner class
         * @default 'spinner-border spinner-border-sm text-white'
         * @see https://getbootstrap.com/docs/5.1/components/spinners/
         */
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
