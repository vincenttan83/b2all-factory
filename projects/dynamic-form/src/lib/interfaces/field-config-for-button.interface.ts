export interface IFieldConfigForButtonConfig {
    type: 'button' | 'reset' | 'submit';
    onclick_fn?: () => Promise<void>;
}

export function isFieldConfigForButtonConfig(obj: any): obj is IFieldConfigForButtonConfig {
    return (
        obj !== null &&
        (obj.type === 'button' || obj.type === 'reset' || obj.type === 'submit') &&
        (typeof obj.onclick_fn === 'undefined' || typeof obj.onclick_fn === 'function')
    );
}
