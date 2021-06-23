import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldArrayComponent } from './dynamic-field-array.component';

describe('DynamicFieldArrayComponent', () => {
  let component: DynamicFieldArrayComponent;
  let fixture: ComponentFixture<DynamicFieldArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFieldArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
