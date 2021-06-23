import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig, IFieldConfigForInputConfig } from '../../field-config.interface';
import { IField } from '../../field.interface';

@Component({
  selector: 'b2all-dynamic-field-input',
  templateUrl: './dynamic-field-input.component.html',
  styleUrls: ['./dynamic-field-input.component.css']
})
export class DynamicFieldInputComponent implements OnInit, IField {

  config!: IFieldConfig;
  group!: FormGroup;
  detailConfig!: IFieldConfigForInputConfig;

  constructor() { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForInputConfig);
  }

}
