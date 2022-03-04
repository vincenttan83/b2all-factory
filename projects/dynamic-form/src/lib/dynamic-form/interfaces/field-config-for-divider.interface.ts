import { EFieldConfigType } from "../enums/field-config-type.enum";

export interface IFieldConfigForDividerConfig {
    name: string;
    type: EFieldConfigType.Divider;
    type_config: any;
}