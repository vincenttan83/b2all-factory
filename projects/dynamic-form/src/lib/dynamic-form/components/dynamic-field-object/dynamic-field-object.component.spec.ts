import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldObjectComponent } from './dynamic-field-object.component';

describe('DynamicFieldObjectComponent', () => {
  let component: DynamicFieldObjectComponent;
  let fixture: ComponentFixture<DynamicFieldObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFieldObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
