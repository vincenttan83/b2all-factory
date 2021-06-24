import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IMultiSelect } from '../../field-config-multiselect.interface';
import { IFieldConfig, IFieldConfigForSelectConfig } from '../../field-config.interface';
import { IField } from '../../field.interface';
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
      console.log(resp);

    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // if (this.detailConfig.controls && this.detailConfig.controls.length > 0 && this.detailConfig.controls[0].value) {
      //   this.privateDynamicFieldSelectService.setValue(this.detailConfig.controls[0].value, 0);
      // }
      for (let i = 0; i < this.detailConfig.controls.length; i++) {
        if (this.detailConfig.controls[i].value) {
          this.privateDynamicFieldSelectService.setValue(this.detailConfig.controls[i].value, i);
        }
      }

    }, 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDataset(byLevel: number, selectedParent: string): IMultiSelect[] | undefined {

    if (byLevel > 0) {
      const childrenDataset = this.detailConfig.dataset.find(fX => {
        // console.log(`${fX.value} === ? ${selectedParent}`);

        return fX.value === selectedParent;
      });
      // console.log(childrenDataset);

      return childrenDataset?.children;
    }
    return this.detailConfig.dataset;

  }

  onChange(value: any, index: number): void {
    this.privateDynamicFieldSelectService.setValue(value.target.value, index);
    // if you are the last index, no need to do any thing
    // else u need to re render your children combo box


  }

}
