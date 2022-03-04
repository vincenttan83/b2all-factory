import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IButtonConfig, IFieldConfigForButtonConfig } from '../../interfaces/field-config-for-button.interface';
import { IField } from '../../interfaces/field.interface';
import { ProgressSpinnerService } from './progress-spinner.service';

@Component({
  selector: 'b2all-dynamic-field-button',
  templateUrl: './dynamic-field-button.component.html',
  styleUrls: ['./dynamic-field-button.component.css']
})
export class DynamicFieldButtonComponent implements OnInit, IField, OnDestroy {

  config!: IFieldConfigForButtonConfig;
  group!: FormGroup;
  arrayIndex!: number;
  formName!: string;

  detailConfig!: IButtonConfig;

  // cssClass!: ICssClass;

  private subscription!: Subscription;
  show!: boolean;

  constructor(
    private progressSpinnerService: ProgressSpinnerService
  ) {
    this.subscription = this.progressSpinnerService.loaderStateChanged$.subscribe(resp => {
      this.show = resp.show;
    });
  }

  ngOnInit(): void {
    this.detailConfig = this.config.type_config;
  }

  async proceedCallBackFunction(): Promise<void> {
    if (this.detailConfig.onclick_fn) {
      this.progressSpinnerService.show();
      await this.detailConfig.onclick_fn();
      this.progressSpinnerService.hide();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async startLoader(): Promise<void> {
    await this.proceedCallBackFunction();
  }

}
