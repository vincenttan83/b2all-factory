import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectDatasetComponent } from './multiselect-dataset.component';

describe('MultiselectDatasetComponent', () => {
  let component: MultiselectDatasetComponent;
  let fixture: ComponentFixture<MultiselectDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectDatasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
