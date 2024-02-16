import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupCategoryComponent } from './add-group-category.component';

describe('AddGroupCategoryComponent', () => {
  let component: AddGroupCategoryComponent;
  let fixture: ComponentFixture<AddGroupCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGroupCategoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
