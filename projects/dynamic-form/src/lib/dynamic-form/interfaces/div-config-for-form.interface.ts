import { IFieldConfig } from './field-config.interface';

export interface IDivConfigForForm {
    form_unique_name: string; // for used when data return identity;
    form_design: IFieldConfig[];
    saved_data: { [key: string]: any };
}
