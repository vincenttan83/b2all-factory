import { IFieldConfig } from './field-config.interface';

export interface IDivConfigForForm<T> {
    form_unique_name: string; // for used when data return identity;
    form_design: IFieldConfig<T>[];
    saved_data: { [key: string]: any };
}
