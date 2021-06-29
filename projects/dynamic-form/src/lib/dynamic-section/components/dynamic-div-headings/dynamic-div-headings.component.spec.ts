import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDivHeadingsComponent } from './dynamic-div-headings.component';

describe('DynamicDivHeadingsComponent', () => {
  let component: DynamicDivHeadingsComponent;
  let fixture: ComponentFixture<DynamicDivHeadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDivHeadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDivHeadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
