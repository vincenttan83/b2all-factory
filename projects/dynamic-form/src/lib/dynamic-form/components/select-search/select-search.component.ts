import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ISelectSearch } from './select-search.interface';

@Component({
  selector: 'b2all-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.css'],
})
export class SelectSearchComponent implements OnInit, OnChanges {
  showDropdown = false;
  @Input() config!: ISelectSearch;
  @Input() group!: FormGroup;
  @Input() cssClass!: any;
  @Input() items: any[] = [];
  @Input() resetEvent!: Observable<void>;
  @Input() matchEvent!: Observable<number>;
  @Input() index!: number;
  @Output() valueOnChanges: EventEmitter<any> = new EventEmitter<any>();
  filterItems: any[] = [];
  tempForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.items && !changes.items.firstChange) {
      this.filterItems = this.items;
    }
  }

  ngOnInit(): void {
    // subscribe to formgroup reset event
    this.resetEvent.subscribe(() => {
      this.tempForm.reset();
      this.setSavedData();
    });
    // init filteritems
    this.filterItems = this.items;
    // build temp form
    this.tempForm = this.fb.group({
      [`${this.config.name}_temp`]: [
        '',
        this.group.controls[this.config.name].validator,
        this.group.controls[this.config.name].asyncValidator
      ]
    });
    // set saved data
    if (this.group.controls[this.config.name].value) {
      this.setSavedData();
    }
    // subscribe user input and filter items
    this.tempForm.controls[`${this.config.name}_temp`].valueChanges.subscribe((value: string) => {
      this.filterItems = this.items?.filter(item => {
        if (value === '' || value === null || value === undefined) {
          return true;
        }
        return item[this.config.key_field].toLowerCase().includes(value.toLowerCase());
      });
    });
    this.matchEvent.subscribe(index => {
      if (index === this.index) {
        this.tempForm.controls[`${this.config.name}_temp`].setValue(null);
      }
    });
  }

  setSavedData(): void {
    if (this.group.controls[this.config.name].value) {
      this.tempForm.controls[`${this.config.name}_temp`].setValue(
        this.items.find(item => item[this.config.value_field] === this.group.controls[this.config.name].value)[this.config.key_field]
      );
    }
  }

  choose(item: any): void {
    this.tempForm.controls[`${this.config.name}_temp`].setValue(item[this.config.key_field]);
    this.group.controls[this.config.name].setValue(item[this.config.value_field]);
  }

  onBlur(): void {
    this.showDropdown = false;
    if (this.tempForm.controls[`${this.config.name}_temp`].value
      && !this.items.some(item => item[this.config.key_field] === this.tempForm.controls[`${this.config.name}_temp`].value)) {
      this.group.controls[this.config.name].setValue(null);
      this.tempForm.controls[`${this.config.name}_temp`].setValue(null);

    }
    this.valueOnChanges.emit(this.group.controls[this.config.name].value);
  }

}
