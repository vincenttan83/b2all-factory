import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EFieldConfigInputType } from '../../enums/field-config-input-type.enum';
import { ICssClass } from '../../interfaces/css-class.interface';
import { IFieldConfigForInputConfig } from '../../interfaces/field-config-for-input.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';
import { IField } from '../../interfaces/field.interface';

@Component({
  selector: 'b2all-dynamic-field-input',
  templateUrl: './dynamic-field-input.component.html',
  styleUrls: ['./dynamic-field-input.component.css']
})
export class DynamicFieldInputComponent implements OnInit, IField<IFieldConfigForInputConfig> {

  config!: IFieldConfig<IFieldConfigForInputConfig>;
  group!: FormGroup;
  index!: number;

  detailConfig!: IFieldConfigForInputConfig;

  cssClass!: ICssClass;

  constructor(
    @Inject('css_class') private privateCssClass: ICssClass,
  ) {
    this.cssClass = this.privateCssClass;
  }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForInputConfig);
  }

  onCheckChange(event: any): void {
    if (this.detailConfig.type === 'checkbox') {
      if (this.detailConfig.list) {
        const fa: FormArray = this.group.get(this.config.name) as FormArray;

        if (event.target.checked) {
          fa.push(new FormControl(event.target.value));
        } else {
          let i = 0;

          for (const element of fa.controls) {
            if (element.value === event.target.value) {
              fa.removeAt(i);
              break;
            }
            i++;
          }

        }
      } else {
        this.group.controls[this.config.name].setValue(event.target.checked);
      }

    } else {
      this.group.controls[this.config.name].setValue(event.target.value);
    }

  }

  shouldChecked(val: string): boolean {
    if (this.detailConfig.type === EFieldConfigInputType.CheckBox) {
      if (this.detailConfig.list) {
        const fa: FormArray = this.group.get(this.config.name) as FormArray;

        let i = 0;
        for (const element of fa.controls) {
          if (element.value === val) {
            return true;
          }
          i++;
        }
      } else {
        return this.group.controls[this.config.name].value;
      }
    } else if (this.detailConfig.type === EFieldConfigInputType.Radio) {
      return val === this.group.controls[this.config.name].value;
    } else {
      return false;
    }
    return false;

  }

}
