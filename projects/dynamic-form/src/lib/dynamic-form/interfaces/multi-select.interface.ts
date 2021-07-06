import { IKeyValueInString } from './key-value.interface';

export interface IMultiSelect extends IKeyValueInString {
    children?: IMultiSelect[];
}
