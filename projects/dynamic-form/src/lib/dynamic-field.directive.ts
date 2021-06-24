import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFieldArrayComponent } from './components/dynamic-field-array/dynamic-field-array.component';
import { DynamicFieldButtonComponent } from './components/dynamic-field-button/dynamic-field-button.component';
import { DynamicFieldDividerComponent } from './components/dynamic-field-divider/dynamic-field-divider.component';
import { DynamicFieldInputComponent } from './components/dynamic-field-input/dynamic-field-input.component';
import { DynamicFieldObjectComponent } from './components/dynamic-field-object/dynamic-field-object.component';
import { DynamicFieldSelectComponent } from './components/dynamic-field-select/dynamic-field-select.component';
import { DynamicFieldTextareaComponent } from './components/dynamic-field-textarea/dynamic-field-textarea.component';
import { IFieldConfig } from './field-config.interface';
import { IField } from './field.interface';

interface IComponent {
  [key: string]: any;
}

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

  component!: ComponentRef<IField>;

  constructor(
    private privateComponentFactoryResolver: ComponentFactoryResolver,
    private privateViewContainerRef: ViewContainerRef
  ) {


  }

  ngOnInit(): void {

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
    this.component.instance.group = this.group;

  }

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

}
