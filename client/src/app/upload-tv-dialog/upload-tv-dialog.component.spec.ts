import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTvDialogComponent } from './upload-tv-dialog.component';

describe('UploadTvDialogComponent', () => {
  let component: UploadTvDialogComponent;
  let fixture: ComponentFixture<UploadTvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTvDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadTvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
