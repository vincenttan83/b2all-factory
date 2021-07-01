import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICssClass } from '../../interfaces/css-class.interface';
import { IFieldConfigForButtonConfig } from '../../interfaces/field-config-for-button.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';
import { IField } from '../../interfaces/field.interface';

@Component({
  selector: 'b2all-dynamic-field-button',
  templateUrl: './dynamic-field-button.component.html',
  styleUrls: ['./dynamic-field-button.component.css']
})
export class DynamicFieldButtonComponent implements OnInit, IField<IFieldConfigForButtonConfig> {

  config!: IFieldConfig<IFieldConfigForButtonConfig>;
  group!: FormGroup;
  index!: number;

  detailConfig!: IFieldConfigForButtonConfig;

  // cssClass!: ICssClass;

  constructor(
    // @Inject('css_class') private privateCssClass: ICssClass,
  ) {
    // this.cssClass = this.privateCssClass;
  }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForButtonConfig);
  }

}
