import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldSelectComponent } from './dynamic-field-select.component';

describe('DynamicFieldSelectComponent', () => {
  let component: DynamicFieldSelectComponent;
  let fixture: ComponentFixture<DynamicFieldSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFieldSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
