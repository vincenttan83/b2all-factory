import { Subject } from 'rxjs';

export interface IDivConfigForButton {
  text: string;
  onclick_fn: () => Promise<void> | null;
  onclick?: string;
  class: string;
  disabled: boolean;
  custom_option: { [key: string]: any };
  subscription?: Subject<boolean>;
}
