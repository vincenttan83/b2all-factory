import { EFieldConfigType } from "../enums/field-config-type.enum";
import { IFieldConfigBased } from "./field-config.interface";

export interface IFieldConfigForDividerConfig extends IFieldConfigBased {
    type: EFieldConfigType.Divider;
    type_config: any;
}