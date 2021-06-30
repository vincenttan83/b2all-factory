import { ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { DynamicDivButtonComponent } from '../../dynamic-form/components/dynamic-div-button/dynamic-div-button.component';
import { DynamicDivFormComponent } from '../../dynamic-form/components/dynamic-div-form/dynamic-div-form.component';
import { DynamicDivHeadingsComponent } from '../../dynamic-form/components/dynamic-div-headings/dynamic-div-headings.component';
import { IDivConfig } from '../interfaces/div-config.interface';
import { IDiv } from '../interfaces/div.interface';

const components: { [key: string]: any } = {
  button: DynamicDivButtonComponent,
  form: DynamicDivFormComponent,
  headings: DynamicDivHeadingsComponent,
};

@Directive({
  selector: '[b2allDynamicDiv]'
})
export class DynamicDivDirective implements OnInit, OnChanges, IDiv<any> {

  @Input() config!: IDivConfig<any>;
  @Input() index!: number;
  @Input() formSubmitEvent?: EventEmitter<any>;
  @Input() formChangeEvent?: EventEmitter<any>;

  component!: ComponentRef<IDiv<any>>;

  constructor(
    private privateComponentFactoryResolver: ComponentFactoryResolver,
    private privateViewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {

    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.privateComponentFactoryResolver.resolveComponentFactory<IDiv<any>>(components[this.config.type]);
    this.component = this.privateViewContainerRef.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.index = this.index;
    this.component.instance.formSubmitEvent = this.formSubmitEvent;
    this.component.instance.formChangeEvent = this.formChangeEvent;
  }

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.index = this.index;
    }
  }

}
