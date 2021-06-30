export interface IDivConfigForButton {
    text: string;
    onclick_fn: () => Promise<void>;
    class: string;
    disabled: boolean;
}
