import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadMismatchOrderComponent } from './file-upload-mismatch-order.component';

describe('FileUploadMismatchOrderComponent', () => {
  let component: FileUploadMismatchOrderComponent;
  let fixture: ComponentFixture<FileUploadMismatchOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadMismatchOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadMismatchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
