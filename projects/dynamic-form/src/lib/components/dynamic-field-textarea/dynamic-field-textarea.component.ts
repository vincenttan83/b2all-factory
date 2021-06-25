import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfigForTextareaConfig } from '../../interfaces/field-config-for-textarea.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';
import { IField } from '../../interfaces/field.interface';

@Component({
  selector: 'b2all-dynamic-field-textarea',
  templateUrl: './dynamic-field-textarea.component.html',
  styleUrls: ['./dynamic-field-textarea.component.css']
})
export class DynamicFieldTextareaComponent implements OnInit, IField {

  config!: IFieldConfig;
  group!: FormGroup;
  index!: number;

  detailConfig!: IFieldConfigForTextareaConfig;

  constructor() { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForTextareaConfig);
  }

}
