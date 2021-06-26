import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IFieldConfigForArrayConfig } from '../../interfaces/field-config-for-array.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';
import { IField } from '../../interfaces/field.interface';

@Component({
  selector: 'b2all-dynamic-field-array',
  templateUrl: './dynamic-field-array.component.html',
  styleUrls: ['./dynamic-field-array.component.css']
})
export class DynamicFieldArrayComponent implements OnInit, IField {

  config!: IFieldConfig;
  group!: FormGroup;
  index!: number;

  detailConfig!: IFieldConfigForArrayConfig;

  theArrays!: FormArray;
  theIndexZeroFormGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForArrayConfig);
    this.theArrays = this.group.controls[this.config.name] as FormArray;
    this.theIndexZeroFormGroup = this.theArrays.controls[0] as FormGroup;

    console.log(this.detailConfig.field_configs);
    console.log(this.theArrays.controls);
    console.log(this.theIndexZeroFormGroup);

  }

  addNew(): void {
    this.theArrays.push(this.theIndexZeroFormGroup);
  }

  getTheFromGroupFromArray(index: number): FormGroup {
    return this.theArrays.controls[index] as FormGroup;
  }

}
