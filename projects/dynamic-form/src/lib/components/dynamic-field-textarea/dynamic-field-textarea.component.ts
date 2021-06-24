import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig, IFieldConfigForTextareaConfig } from '../../field-config.interface';
import { IField } from '../../field.interface';

@Component({
  selector: 'b2all-dynamic-field-textarea',
  templateUrl: './dynamic-field-textarea.component.html',
  styleUrls: ['./dynamic-field-textarea.component.css']
})
export class DynamicFieldTextareaComponent implements OnInit, IField {

  config!: IFieldConfig;
  group!: FormGroup;
  detailConfig!: IFieldConfigForTextareaConfig;

  constructor() { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForTextareaConfig);
  }

}
