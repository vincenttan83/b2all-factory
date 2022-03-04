import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EFieldConfigInputType } from '../../enums/field-config-input-type.enum';
import { IFieldConfigForInputConfig, IInputConfig } from '../../interfaces/field-config-for-input.interface';
import { IField } from '../../interfaces/field.interface';

@Component({
  selector: 'b2all-dynamic-field-input',
  templateUrl: './dynamic-field-input.component.html',
  styleUrls: ['./dynamic-field-input.component.css']
})
export class DynamicFieldInputComponent implements OnInit, IField {

  config!: IFieldConfigForInputConfig;
  group!: FormGroup;
  arrayIndex!: number;
  formName!: string;

  detailConfig!: IInputConfig;

  // cssClass!: ICssClass;

  constructor(
    // @Inject('css_class') private privateCssClass: ICssClass,
  ) {
    // this.cssClass = this.privateCssClass;
  }

  ngOnInit(): void {
    this.detailConfig = this.config.type_config;
  }

  getCssClasses(touched: boolean, valid: boolean): string {

    const hasValidation = (this.config.validation_fn && this.config.validation_fn.length > 0);

    if (hasValidation) {
      if (touched) {
        if (valid) {
          return this.getBasicCss() + ' is-valid' + this.getSpecialCss();
        } else {
          return this.getBasicCss() + ' is-invalid' + this.getSpecialCss();
        }
      } else {
        return this.getBasicCss() + this.getSpecialCss();
      }
    } else {
      return this.getBasicCss() + this.getSpecialCss();
    }

  }

  getBasicCss(): string {
    return this.detailConfig.css_class.input ? ` ${this.detailConfig.css_class.input}` : '';
  }

  getSpecialCss(): string {
    return this.config.type_config.css_class ? ` ${this.config.type_config.css_class}` : '';
  }

  onCheckChange(event: any): void {
    if (this.detailConfig.type === EFieldConfigInputType.CheckBox) {
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

  generateId(
    formName: string,
    inputType: string,
    controlName: string,
    arrayIndex: number,
  ): string {
    let name: string;
    name = '';
    if (formName) {
      name = name + formName + '_';
    }
    if (inputType) {
      name = name + inputType + '_';
    }
    if (controlName) {
      name = name + controlName + '_';
    }
    if (arrayIndex) {
      name = name + arrayIndex + '_';
    }

    return name;
  }

}
