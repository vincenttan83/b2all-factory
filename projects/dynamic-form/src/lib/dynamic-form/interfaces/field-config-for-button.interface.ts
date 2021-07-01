export interface IFieldConfigForButtonConfig {
    type: 'button' | 'submit'; // reset should be just refresh the page
    onclick_fn?: () => Promise<void>;
    css_class: {
        group: string;
        button: string;
    };
}

export function isFieldConfigForButtonConfig(obj: any): obj is IFieldConfigForButtonConfig {
    return (
        obj !== null &&
        (obj.type === 'button' || obj.type === 'submit') &&
        (typeof obj.onclick_fn === 'undefined' || typeof obj.onclick_fn === 'function')
    );
}
