import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { DynamicDivButtonComponent } from '../components/dynamic-div-button/dynamic-div-button.component';
import { DynamicDivHeadingsComponent } from '../components/dynamic-div-headings/dynamic-div-headings.component';
import { IDivConfig } from '../interfaces/div-config.interface';
import { IDiv } from '../interfaces/div.interface';

const components: { [key: string]: any } = {
  button: DynamicDivButtonComponent,
  headings: DynamicDivHeadingsComponent,
};

@Directive({
  selector: '[b2allDynamicDiv]'
})
export class DynamicDivDirective implements OnInit, OnChanges, IDiv<any> {

  @Input() config!: IDivConfig<any>;
  @Input() index!: number;

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

  }

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.index = this.index;
    }
  }

}
