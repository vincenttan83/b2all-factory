import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EFieldConfigType } from 'projects/dynamic-form/src/public-api';
import { DynamicFieldArrayComponent } from '../components/dynamic-field-array/dynamic-field-array.component';
import { DynamicFieldButtonComponent } from '../components/dynamic-field-button/dynamic-field-button.component';
import { DynamicFieldDividerComponent } from '../components/dynamic-field-divider/dynamic-field-divider.component';
import { DynamicFieldInputComponent } from '../components/dynamic-field-input/dynamic-field-input.component';
import { DynamicFieldObjectComponent } from '../components/dynamic-field-object/dynamic-field-object.component';
import { DynamicFieldSelectComponent } from '../components/dynamic-field-select/dynamic-field-select.component';
import { DynamicFieldTextareaComponent } from '../components/dynamic-field-textarea/dynamic-field-textarea.component';
import { IComponent } from '../interfaces/component.interface';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { IField } from '../interfaces/field.interface';

const components: IComponent = {
  array: DynamicFieldArrayComponent,
  button: DynamicFieldButtonComponent,
  divider: DynamicFieldDividerComponent,
  input: DynamicFieldInputComponent,
  object: DynamicFieldObjectComponent,
  select: DynamicFieldSelectComponent,
  textarea: DynamicFieldTextareaComponent,
};

@Directive({
  selector: '[b2allDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges, IField<any> {

  @Input() config!: IFieldConfig<any>;
  @Input() group!: FormGroup;
  @Input() arrayIndex!: number;
  @Input() abstractControl!: AbstractControl;
  @Input() formName!: string;

  component!: ComponentRef<IField<any>>;

  constructor(
    private privateComponentFactoryResolver: ComponentFactoryResolver,
    private privateViewContainerRef: ViewContainerRef
  ) {


  }

  ngOnInit(): void {

    if (this.config.type !== EFieldConfigType.RadioButtonDefault) {

      if (!components[this.config.type]) {
        const supportedTypes = Object.keys(components).join(', ');
        throw new Error(
          `Trying to use an unsupported type (${this.config.type}).
          Supported types: ${supportedTypes}`
        );
      }
      const component = this.privateComponentFactoryResolver.resolveComponentFactory<IField<any>>(components[this.config.type]);
      this.component = this.privateViewContainerRef.createComponent(component);
      this.component.instance.config = this.config;
      this.component.instance.group = this.group ?? this.abstractControl as FormGroup;
      this.component.instance.arrayIndex = this.arrayIndex;
      this.component.instance.formName = this.formName;
    }


  }

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group ?? this.abstractControl as FormGroup;
      this.component.instance.arrayIndex = this.arrayIndex;
      this.component.instance.formName = this.formName;
    }
  }

}
