import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EDivConfigType } from '../enums/div-config-type.enum';
import { IDivConfigForForm } from '../interfaces/div-config-for-form.interface';
import { IDivConfig } from '../interfaces/div-config.interface';

@Component({
  exportAs: 'b2allDynamicSection',
  selector: 'b2all-dynamic-section',
  template: `
    <section>
      <div class="row" *ngFor="let div of inputSectionConfigs; index as i;">
        <div class="col">
          <ng-container
            b2allDynamicDiv
            [config]="div"
            [index]="i"
            [formSubmitEvent]="div.type==='form' ? outputFormSubmitEvent : undefined"
            [formChangeEvent]="div.type==='form' ? outputFormChangeEvent : undefined"
          >
          </ng-container>
        </div>
      </div>
    </section>
  `,
  styleUrls: []
})
export class DynamicSectionComponent implements OnInit, OnChanges {
  @Input() inputSectionConfigs: IDivConfig<any>[] = [];
  @Output() outputFormSubmitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() outputFormChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    // error handling data checking
    // catch all form name into an array first

    const formNames: string[] = [];
    this.inputSectionConfigs.forEach(element => {
      if (element.type === EDivConfigType.Form) {
        formNames.push((element.content as IDivConfigForForm).form_unique_name);
      }
    });

    if (formNames.length > 0) {
      if (formNames.filter((item, index) => formNames.indexOf(item) !== index).length > 0) {
        throw new Error('Form name in a same page must unique!');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.inputSectionConfigs) {
      for (const element of this.inputSectionConfigs) {
        if (!element) {
          throw new Error('Empty section detected!');
        }
      }
    }
  }

}
