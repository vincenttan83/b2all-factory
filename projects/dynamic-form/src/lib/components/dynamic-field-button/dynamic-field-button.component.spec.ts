import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldButtonComponent } from './dynamic-field-button.component';

describe('DynamicFieldButtonComponent', () => {
  let component: DynamicFieldButtonComponent;
  let fixture: ComponentFixture<DynamicFieldButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFieldButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
