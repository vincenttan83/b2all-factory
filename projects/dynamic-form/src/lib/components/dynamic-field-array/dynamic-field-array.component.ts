import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormGenerator } from '../../dynamic-form-generator.class';
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

  constructor(
    private privateFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForArrayConfig);
    this.theArrays = this.group.controls[this.config.name] as FormArray;
    this.theIndexZeroFormGroup = this.theArrays.controls[0] as FormGroup;
  }

  addNew(): void {
    const dfg: DynamicFormGenerator = new DynamicFormGenerator(this.privateFormBuilder);
    const newRow: FormGroup = dfg.createFormGroup(this.detailConfig.field_configs, null, {});
    this.theArrays.push(newRow);
  }

  removeRow(index: number): void {
    this.theArrays.removeAt(index);
  }

  getTheFromGroupFromArray(index: number): FormGroup {
    return this.theArrays.controls[index] as FormGroup;
  }

}
