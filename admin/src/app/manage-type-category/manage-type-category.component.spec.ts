import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTypeCategoryComponent } from './manage-type-category.component';

describe('ManageTypeCategoryComponent', () => {
  let component: ManageTypeCategoryComponent;
  let fixture: ComponentFixture<ManageTypeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTypeCategoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTypeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
