import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDivFormComponent } from './dynamic-div-form.component';

describe('DynamicDivFormComponent', () => {
  let component: DynamicDivFormComponent;
  let fixture: ComponentFixture<DynamicDivFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDivFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDivFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
