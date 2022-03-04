import { EFieldConfigType } from "../enums/field-config-type.enum";

export interface IFieldConfigForRadioButtonDefaultConfig {
    name: string;
    type: EFieldConfigType.RadioButtonDefault;
    type_config: any;
}