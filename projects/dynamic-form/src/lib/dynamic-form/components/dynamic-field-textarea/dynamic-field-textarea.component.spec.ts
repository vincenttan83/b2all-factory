import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldTextareaComponent } from './dynamic-field-textarea.component';

describe('DynamicFieldTextareaComponent', () => {
  let component: DynamicFieldTextareaComponent;
  let fixture: ComponentFixture<DynamicFieldTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFieldTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
