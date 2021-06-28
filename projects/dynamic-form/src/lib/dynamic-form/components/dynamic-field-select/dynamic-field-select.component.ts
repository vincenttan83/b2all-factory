import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig, ICssClass, IMultiSelect } from 'projects/dynamic-form/src/public-api';
import { Subscription } from 'rxjs';
import { IFieldConfigForSelectConfig } from '../../interfaces/field-config-for-select.interface';
import { IField } from '../../interfaces/field.interface';
import { DynamicFieldSelectService } from './dynamic-field-select.service';

@Component({
  selector: 'b2all-dynamic-field-select',
  templateUrl: './dynamic-field-select.component.html',
  styleUrls: ['./dynamic-field-select.component.css'],
  providers: [DynamicFieldSelectService]
})
export class DynamicFieldSelectComponent implements OnInit, IField, OnDestroy {

  config!: IFieldConfig;
  group!: FormGroup;
  index!: number;

  detailConfig!: IFieldConfigForSelectConfig;

  cssClass!: ICssClass;

  runningValues: { key: string, value: string }[] = [];

  subscription!: Subscription;

  latestDatabase: { [key: string]: any } = {};

  constructor(
    @Inject('css_class') private privateCssClass: ICssClass,
    private privateDynamicFieldSelectService: DynamicFieldSelectService
  ) {
    this.cssClass = this.privateCssClass;
  }

  ngOnInit(): void {
    this.detailConfig = (this.config.type_config as IFieldConfigForSelectConfig);

    const savedSelectedValue: string[] = [];
    this.detailConfig.controls.forEach(element => {
      savedSelectedValue.push(this.group.controls[element.name].value ?? null);
    });

    this.privateDynamicFieldSelectService.setDatabase(this.detailConfig.dataset, this.detailConfig.controls.length, savedSelectedValue);
    this.latestDatabase = this.privateDynamicFieldSelectService.getDatabase();

    // subscribe to handle user change combo box event
    // it will then refresh the state data
    // and update the formgroup data
    // so that the combo box will auto select / reset the relavant option
    this.subscription = this.privateDynamicFieldSelectService.storageChanged$.subscribe(resp => {
      this.latestDatabase = { ...resp };
      for (let i = 0; i < this.detailConfig.controls.length; i++) {
        this.group.controls[this.detailConfig.controls[i].name].setValue(this.latestDatabase['selected_value_' + i]);
      }
    });
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
