import { FormGroup } from '@angular/forms';
import { IFieldConfig } from './field-config.interface';

export interface IField<T> {
    config: IFieldConfig<T>;
    group: FormGroup;
    index: number;
}
