import { EFieldConfigType } from "../enums/field-config-type.enum";
import { IFieldConfigBased } from "./field-config.interface";

export interface IFieldConfigForRadioButtonDefaultConfig extends IFieldConfigBased {
    type: EFieldConfigType.RadioButtonDefault;
    type_config: any;
}