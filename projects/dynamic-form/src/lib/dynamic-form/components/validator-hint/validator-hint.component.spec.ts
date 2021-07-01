import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorHintComponent } from './validator-hint.component';

describe('ValidatorHintComponent', () => {
  let component: ValidatorHintComponent;
  let fixture: ComponentFixture<ValidatorHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
