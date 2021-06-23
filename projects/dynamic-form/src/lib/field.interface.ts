import { FormGroup } from '@angular/forms';
import { IFieldConfig, IFieldConfigForButtonConfig } from './field-config.interface';

export interface IField {
    config: IFieldConfig;
    group: FormGroup;
}
