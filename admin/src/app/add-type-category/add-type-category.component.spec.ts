import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeCategoryComponent } from './add-type-category.component';

describe('AddTypeCategoryComponent', () => {
  let component: AddTypeCategoryComponent;
  let fixture: ComponentFixture<AddTypeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTypeCategoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
