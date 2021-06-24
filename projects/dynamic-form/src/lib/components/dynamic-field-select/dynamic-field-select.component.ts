import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig, IFieldConfigForSelectConfig } from '../../field-config.interface';
import { IField } from '../../field.interface';

@Component({
  selector: 'b2all-dynamic-field-select',
  templateUrl: './dynamic-field-select.component.html',
  styleUrls: ['./dynamic-field-select.component.css']
})
export class DynamicFieldSelectComponent implements OnInit, IField {

  config!: IFieldConfig;
  group!: FormGroup;
  detailConfig!: IFieldConfigForSelectConfig;

  constructor() { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForSelectConfig);
  }

}
