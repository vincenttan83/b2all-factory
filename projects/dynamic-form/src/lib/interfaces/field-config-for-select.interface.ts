import { IMultiSelect } from './field-config-multiselect.interface';

export interface IFieldConfigForSelectConfig {
    /**
     * Only accept dataset in the outer join manner for
     * dependant combo box
     */
    dataset: IMultiSelect[];
    controls: {
        name: string;
        label: string;
        key_field: string;
        value_field: string;
        value: string | null;
    }[];
}

export function isFieldConfigForSelectConfig(obj: any): obj is IFieldConfigForSelectConfig {
    return (
        obj !== null &&
        obj.dataset !== null &&
        typeof obj.dataset === 'object' &&
        obj.controls !== null &&
        typeof obj.controls === 'object'
    );
}
