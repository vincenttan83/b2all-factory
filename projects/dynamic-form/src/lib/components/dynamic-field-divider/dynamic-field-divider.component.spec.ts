import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldDividerComponent } from './dynamic-field-divider.component';

describe('DynamicFieldDividerComponent', () => {
  let component: DynamicFieldDividerComponent;
  let fixture: ComponentFixture<DynamicFieldDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFieldDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
