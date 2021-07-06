import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignareComponent } from './designare.component';

describe('DesignareComponent', () => {
  let component: DesignareComponent;
  let fixture: ComponentFixture<DesignareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
