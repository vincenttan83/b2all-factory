import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfigForObjectConfig, IObjectConfig } from '../../interfaces/field-config-for-object.interface';
import { IField } from '../../interfaces/field.interface';

@Component({
  selector: 'b2all-dynamic-field-object',
  templateUrl: './dynamic-field-object.component.html',
  styleUrls: ['./dynamic-field-object.component.css']
})
export class DynamicFieldObjectComponent implements OnInit, IField {

  config!: IFieldConfigForObjectConfig;
  group!: FormGroup;
  arrayIndex!: number;
  formName!: string;

  detailConfig!: IObjectConfig;

  theSubGroup!: FormGroup; // = this.group.controls[this.config.name];

  constructor() { }

  ngOnInit(): void {
    this.detailConfig = this.config.type_config;
    this.theSubGroup = this.group.controls[this.config.name] as FormGroup;
  }

}
