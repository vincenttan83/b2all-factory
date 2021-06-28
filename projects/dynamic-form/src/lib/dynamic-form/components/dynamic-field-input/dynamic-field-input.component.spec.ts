import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldInputComponent } from './dynamic-field-input.component';

describe('DynamicFieldInputComponent', () => {
  let component: DynamicFieldInputComponent;
  let fixture: ComponentFixture<DynamicFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFieldInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
