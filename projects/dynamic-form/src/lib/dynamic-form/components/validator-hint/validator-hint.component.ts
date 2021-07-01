import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2all-validator-hint',
  templateUrl: './validator-hint.component.html',
  styleUrls: ['./validator-hint.component.css']
})
export class ValidatorHintComponent implements OnInit {

  @Input() validation: any;

  constructor() { }

  ngOnInit(): void {
  }

}
