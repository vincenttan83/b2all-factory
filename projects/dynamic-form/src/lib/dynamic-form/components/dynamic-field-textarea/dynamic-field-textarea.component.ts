import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfigForTextareaConfig, ITextareaConfig } from '../../interfaces/field-config-for-textarea.interface';
import { IField } from '../../interfaces/field.interface';

@Component({
  selector: 'b2all-dynamic-field-textarea',
  templateUrl: './dynamic-field-textarea.component.html',
  styleUrls: ['./dynamic-field-textarea.component.css']
})
export class DynamicFieldTextareaComponent implements OnInit, IField {

  config!: IFieldConfigForTextareaConfig;
  group!: FormGroup;
  arrayIndex!: number;
  formName!: string;

  detailConfig!: ITextareaConfig;

  // cssClass!: ICssClass;

  constructor(
    // @Inject('css_class') private privateCssClass: ICssClass,
  ) {
    // this.cssClass = this.privateCssClass;
  }

  ngOnInit(): void {
    this.detailConfig = this.config.type_config;
  }

  generateId(
    formName: string,
    controlName: string,
    arrayIndex: number,
  ): string {
    let name: string;
    name = '';
    if (formName) {
      name = name + formName + '_';
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
