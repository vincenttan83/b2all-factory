export interface IFieldConfigForTextareaConfig {
    row_count: number;
    col_count?: number;
}

export function isFieldConfigForTextareaConfig(obj: any): obj is IFieldConfigForTextareaConfig {
    return (
        obj !== null &&
        typeof obj.row_count === 'number' &&
        (typeof obj.col_count === 'undefined' || typeof obj.col_count === 'number')
    );
}
