import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfigForObjectConfig } from '../../interfaces/field-config-for-object.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';
import { IField } from '../../interfaces/field.interface';

@Component({
  selector: 'b2all-dynamic-field-object',
  templateUrl: './dynamic-field-object.component.html',
  styleUrls: ['./dynamic-field-object.component.css']
})
export class DynamicFieldObjectComponent<T> implements OnInit, IField<T> {

  config!: IFieldConfig<T>;
  group!: FormGroup;
  index!: number;

  detailConfig!: IFieldConfigForObjectConfig<T>;

  theSubGroup!: FormGroup; // = this.group.controls[this.config.name];

  constructor() { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as unknown as IFieldConfigForObjectConfig<T>);
    this.theSubGroup = this.group.controls[this.config.name] as FormGroup;
  }

}
