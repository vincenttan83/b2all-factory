export interface IMultiSelect {
    key: string;
    value: string;
    children?: IMultiSelect[];
    is_selected?: boolean;
}
