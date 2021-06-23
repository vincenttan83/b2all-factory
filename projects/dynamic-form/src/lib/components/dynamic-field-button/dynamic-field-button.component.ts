import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig, IFieldConfigForButtonConfig } from '../../field-config.interface';
import { IField } from '../../field.interface';

@Component({
  selector: 'b2all-dynamic-field-button',
  templateUrl: './dynamic-field-button.component.html',
  styleUrls: ['./dynamic-field-button.component.css']
})
export class DynamicFieldButtonComponent implements OnInit, IField {

  config!: IFieldConfig;
  group!: FormGroup;
  detailConfig!: IFieldConfigForButtonConfig;

  constructor() { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForButtonConfig);
  }

}
