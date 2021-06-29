import { IDivConfig } from './div-config.interface';

export interface IDiv<T> {
    config: IDivConfig<T>;
    index: number;
}
