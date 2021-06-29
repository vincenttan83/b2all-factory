import { Component, Input, OnInit } from '@angular/core';
import { IDivConfig } from './interfaces/div-config.interface';

@Component({
  exportAs: 'b2allDynamicSection',
  selector: 'b2all-dynamic-section',
  template: `
    <section>
      <div class="row" *ngFor="let div of inputSectionConfigs">
        <div class="col">
          <ng-container b2allDynamicDiv [config]="div"></ng-container>
        </div>
      </div>
    </section>
  `,
  styleUrls: []
})
export class DynamicSectionComponent implements OnInit {

  @Input() inputSectionConfigs: IDivConfig<any>[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
