import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFieldConfigForSelectConfig } from '../../interfaces/field-config-for-select.interface';
import { IMultiSelect } from '../../interfaces/field-config-multiselect.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';
import { IField } from '../../interfaces/field.interface';
import { DynamicFieldSelectService } from './dynamic-field-select.service';

@Component({
  selector: 'b2all-dynamic-field-select',
  templateUrl: './dynamic-field-select.component.html',
  styleUrls: ['./dynamic-field-select.component.css'],
  providers: [DynamicFieldSelectService]
})
export class DynamicFieldSelectComponent implements OnInit, IField, OnDestroy, AfterViewInit {

  config!: IFieldConfig;
  group!: FormGroup;
  detailConfig!: IFieldConfigForSelectConfig;

  runningValues: { key: string, value: string }[] = [];

  subscription!: Subscription;

  latestDatabase: { [key: string]: any } = {};

  constructor(
    private privateDynamicFieldSelectService: DynamicFieldSelectService
  ) { }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForSelectConfig);
    this.privateDynamicFieldSelectService.setDatabase(this.detailConfig.dataset, this.detailConfig.controls.length);
    this.subscription = this.privateDynamicFieldSelectService.storageChanged$.subscribe(resp => {
      this.latestDatabase = { ...resp };
      // since latest db is ready
      // we need to update the reative from control of the "selected" value
      // so that HTML will render correctly without "selected" property
      for (let i = 0; i < this.detailConfig.controls.length; i++) {
        this.group.controls[this.detailConfig.controls[i].name].setValue(this.latestDatabase['selected_value_' + i]);
      }
    });
  }

  ngAfterViewInit(): void {
    let atLeastOneTrigger = false;

    // to avoid Expression has changed after it was checked. Previous value: 'undefined'. error
    setTimeout(() => {
      for (let i = 0; i < this.detailConfig.controls.length; i++) {
        // if having any saved value, help user select it back...
        if (this.detailConfig.controls[i].value) {
          this.privateDynamicFieldSelectService.setValue(this.detailConfig.controls[i].value, i);
          atLeastOneTrigger = true;
        }
      }

      if (!atLeastOneTrigger) {
        // is all new form n selection, let's trigger the root level
        this.privateDynamicFieldSelectService.refreshStorage();
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * this method is to return the children key value pair dynamically
   * automatically look for the correct level of the children from the hirarchy database
   * @param byLevel let the method know ur current level
   * @param selectedParent supply the selected parent
   * @returns the children list of key value pair
   */
  getDataset(byLevel: number, selectedParent: string): IMultiSelect[] | undefined {
    if (byLevel > 0) {
      const childrenDataset = this.detailConfig.dataset.find(fX => {
        return fX.value === selectedParent;
      });
      return childrenDataset?.children;
    }
    return this.detailConfig.dataset;
  }

  // push a changes to the combo box selection changed.
  onChange(value: any, index: number): void {
    this.privateDynamicFieldSelectService.setValue(value.target.value, index);
  }

}
