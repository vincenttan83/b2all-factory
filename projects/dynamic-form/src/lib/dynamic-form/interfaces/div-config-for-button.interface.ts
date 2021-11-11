export interface IDivConfigForButton {
  text: string;
  onclick_fn: () => Promise<void> | null;
  onclick?: string;
  class: string;
  disabled: boolean;
  option: { [key: string]: any };
}
