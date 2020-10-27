import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadMainComponent } from './file-upload-main.component';

describe('FileUploadOrderComponent', () => {
  let component: FileUploadMainComponent;
  let fixture: ComponentFixture<FileUploadMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
