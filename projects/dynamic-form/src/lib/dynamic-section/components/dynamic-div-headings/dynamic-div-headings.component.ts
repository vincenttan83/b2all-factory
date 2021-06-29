import { Component, OnInit } from '@angular/core';
import { IDivConfig, IDivConfigForHeadings } from '../../interfaces/div-config.interface';
import { IDiv } from '../../interfaces/div.interface';

@Component({
  selector: 'b2all-dynamic-div-headings',
  templateUrl: './dynamic-div-headings.component.html',
  styleUrls: ['./dynamic-div-headings.component.css']
})
export class DynamicDivHeadingsComponent implements OnInit, IDiv<IDivConfigForHeadings> {

  config!: IDivConfig<IDivConfigForHeadings>;
  index!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
