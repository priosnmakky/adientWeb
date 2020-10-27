import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadOrderComponent } from './file-upload-order.component';

describe('FileUploadOrderComponent', () => {
  let component: FileUploadOrderComponent;
  let fixture: ComponentFixture<FileUploadOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
