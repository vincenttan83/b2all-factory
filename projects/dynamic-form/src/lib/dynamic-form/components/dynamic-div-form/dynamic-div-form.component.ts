import { AfterViewInit, Component, EventEmitter, ViewChild } from '@angular/core';
import { IDivConfigForForm } from '../../interfaces/div-config-for-form.interface';
import { IDivConfig } from '../../interfaces/div-config.interface';
import { IDiv } from '../../interfaces/div.interface';
import { DynamicFormComponent } from '../dynamic-form.component';

@Component({
  selector: 'b2all-dynamic-div-form',
  templateUrl: './dynamic-div-form.component.html',
  styleUrls: ['./dynamic-div-form.component.css']
})
export class DynamicDivFormComponent implements IDiv<IDivConfigForForm<any>>, AfterViewInit {

  config!: IDivConfig<IDivConfigForForm<any>>;
  index!: number;

  @ViewChild(DynamicFormComponent) dynamicDivForm!: DynamicFormComponent;

  formSubmitEvent!: EventEmitter<any>;
  formChangeEvent!: EventEmitter<any>;

  async formOnSubmit(event: any): Promise<void> {
    this.formSubmitEvent.emit({ form_name: this.config.content.form_unique_name, form_index: this.index, form_data: event });
  }

  ngAfterViewInit(): void {
    this.dynamicDivForm.changes.subscribe(resp => {
      this.formChangeEvent.emit({
        form_name: this.config.content.form_unique_name,
        form_index: this.index,
        form_data: resp,
        form_valid: this.dynamicDivForm.valid,
        form_dirty: this.dynamicDivForm.dirty,
        form_value: this.dynamicDivForm.value,
      });
    });
  }

}
