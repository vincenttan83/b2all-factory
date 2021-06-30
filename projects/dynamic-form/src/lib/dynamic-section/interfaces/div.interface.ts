import { EventEmitter } from '@angular/core';
import { IDivConfig } from './div-config.interface';

export interface IDiv<T> {
    config: IDivConfig<T>;
    index: number;
    formSubmitEvent?: EventEmitter<any>;
    formChangeEvent?: EventEmitter<any>;
}
