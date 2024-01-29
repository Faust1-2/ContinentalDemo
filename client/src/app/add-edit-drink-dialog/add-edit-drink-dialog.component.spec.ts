import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDrinkDialogComponent } from './add-edit-drink-dialog.component';

describe('AddEditDrinkDialogComponent', () => {
  let component: AddEditDrinkDialogComponent;
  let fixture: ComponentFixture<AddEditDrinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDrinkDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDrinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
