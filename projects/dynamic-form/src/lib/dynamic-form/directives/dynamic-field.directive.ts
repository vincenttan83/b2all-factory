import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFieldArrayComponent } from '../components/dynamic-field-array/dynamic-field-array.component';
import { DynamicFieldButtonComponent } from '../components/dynamic-field-button/dynamic-field-button.component';
import { DynamicFieldDividerComponent } from '../components/dynamic-field-divider/dynamic-field-divider.component';
import { DynamicFieldInputComponent } from '../components/dynamic-field-input/dynamic-field-input.component';
import { DynamicFieldObjectComponent } from '../components/dynamic-field-object/dynamic-field-object.component';
import { DynamicFieldSelectComponent } from '../components/dynamic-field-select/dynamic-field-select.component';
import { DynamicFieldTextareaComponent } from '../components/dynamic-field-textarea/dynamic-field-textarea.component';
import { EFieldConfigType } from '../enums/field-config-type.enum';
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
export class DynamicFieldDirective implements OnInit, OnChanges, IField {

  @Input() config!: IFieldConfig;
  @Input() group!: FormGroup;
  @Input() arrayIndex!: number;
  @Input() abstractControl!: AbstractControl;
  @Input() formName!: string;
  @Input() resetEvent!: Observable<void>;

  component!: ComponentRef<IField>;

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
      const component = this.privateComponentFactoryResolver.resolveComponentFactory<IField>(components[this.config.type]);
      this.component = this.privateViewContainerRef.createComponent(component);
      this.component.instance.config = this.config;
      this.component.instance.group = this.group ?? this.abstractControl as FormGroup;
      this.component.instance.arrayIndex = this.arrayIndex;
      this.component.instance.formName = this.formName;
      this.component.instance.resetEvent = this.resetEvent;
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
