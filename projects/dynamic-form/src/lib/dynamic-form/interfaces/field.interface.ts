import { FormGroup } from '@angular/forms';
import { IFieldConfig } from './field-config.interface';

export interface IField {
    config: IFieldConfig;
    group: FormGroup;
    index: number;
}
