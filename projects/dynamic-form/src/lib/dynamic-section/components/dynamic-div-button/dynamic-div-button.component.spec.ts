import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDivButtonComponent } from './dynamic-div-button.component';

describe('DynamicDivButtonComponent', () => {
  let component: DynamicDivButtonComponent;
  let fixture: ComponentFixture<DynamicDivButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDivButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDivButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
