import { Component, OnInit } from '@angular/core';
import { IDivConfigForButton } from '../../interfaces/div-config-for-button.interface';
import { IDivConfig } from '../../interfaces/div-config.interface';
import { IDiv } from '../../interfaces/div.interface';

@Component({
  selector: 'b2all-dynamic-div-button',
  templateUrl: './dynamic-div-button.component.html',
  styleUrls: ['./dynamic-div-button.component.css']
})
export class DynamicDivButtonComponent implements OnInit, IDiv<IDivConfigForButton> {

  config!: IDivConfig<IDivConfigForButton>;
  index!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
