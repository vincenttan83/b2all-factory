import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFieldConfig } from './field-config.interface';

export interface IField {
    resetEvent?: Observable<void>;
    config: IFieldConfig;
    group: FormGroup;
    arrayIndex: number;
    formName: string;
}
