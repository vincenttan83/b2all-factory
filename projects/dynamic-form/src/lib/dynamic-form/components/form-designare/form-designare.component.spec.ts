import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignareComponent } from './form-designare.component';

describe('FormDesignareComponent', () => {
  let component: FormDesignareComponent;
  let fixture: ComponentFixture<FormDesignareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDesignareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesignareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
