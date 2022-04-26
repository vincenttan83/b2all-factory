import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IFieldConfigForSelectConfig, ISelectConfig } from '../../interfaces/field-config-for-select.interface';
import { IField } from '../../interfaces/field.interface';
import { IMultiSelect } from '../../interfaces/multi-select.interface';
import { DynamicFieldSelectService } from './dynamic-field-select.service';

@Component({
  selector: 'b2all-dynamic-field-select',
  templateUrl: './dynamic-field-select.component.html',
  styleUrls: ['./dynamic-field-select.component.css'],
  providers: [DynamicFieldSelectService]
})
export class DynamicFieldSelectComponent implements OnInit, IField, OnDestroy {

  config!: IFieldConfigForSelectConfig;
  group!: FormGroup;
  arrayIndex!: number;
  formName!: string;
  resetEvent!: Observable<void>;

  detailConfig!: ISelectConfig;

  // cssClass!: ICssClass;

  runningValues: { key: string, value: string }[] = [];

  subscription!: Subscription;

  latestDatabase: { [key: string]: any } = {};

  constructor(
    // @Inject('css_class') private privateCssClass: ICssClass,
    private privateDynamicFieldSelectService: DynamicFieldSelectService
  ) {
    // this.cssClass = this.privateCssClass;
  }

  ngOnInit(): void {
    this.detailConfig = this.config.type_config;

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

  generateId(
    formName: string,
    controlName: string,
    arrayIndex: number,
  ): string {
    let name: string;
    name = '';
    if (formName) {
      name = name + formName + '_';
    }
    if (controlName) {
      name = name + controlName + '_';
    }
    if (arrayIndex) {
      name = name + arrayIndex + '_';
    }

    return name;
  }

  getCssClasses(touched: boolean, valid: boolean): string {
    const hasValidation = (this.config.validation_fn && this.config.validation_fn.length > 0);
    if (hasValidation) {
      if (touched) {
        if (valid) {
          return this.getBasicCss() + ' is-valid' + this.getSpecialCss();
        } else {
          return this.getBasicCss() + ' is-invalid' + this.getSpecialCss();
        }
      } else {
        return this.getBasicCss() + this.getSpecialCss();
      }
    } else {
      return this.getBasicCss() + this.getSpecialCss();
    }

  }

  getBasicCss(): string {
    return this.detailConfig.css_class.select ? ` ${this.detailConfig.css_class.select}` : '';
  }

  getSpecialCss(): string {
    return this.config.type_config.css_class ? ` ${this.config.type_config.css_class}` : '';
  }

  onSelectSearch(value: any, index: number): void {
    this.privateDynamicFieldSelectService.setValue(value, index);
  }
}
