import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from 'projects/dynamic-form/src/public-api';
import { IDivConfig, IDivConfigForForm } from '../../interfaces/div-config.interface';
import { IDiv } from '../../interfaces/div.interface';

@Component({
  selector: 'b2all-dynamic-div-form',
  templateUrl: './dynamic-div-form.component.html',
  styleUrls: ['./dynamic-div-form.component.css']
})
export class DynamicDivFormComponent implements IDiv<IDivConfigForForm>, AfterViewInit {

  config!: IDivConfig<IDivConfigForForm>;
  index!: number;

  @ViewChild(DynamicFormComponent) dynamicDivForm!: DynamicFormComponent;

  formSubmitEvent!: EventEmitter<any>;
  formChangeEvent!: EventEmitter<any>;

  async formOnSubmit(event: any): Promise<void> {
    this.formSubmitEvent.emit({ form_name: this.config.content.form_unique_name, form_index: this.index, form_data: event });
  }

  ngAfterViewInit(): void {
    this.dynamicDivForm.changes.subscribe(resp => {
      this.formChangeEvent.emit({ form_name: this.config.content.form_unique_name, form_index: this.index, form_data: resp });
    });
  }

}
