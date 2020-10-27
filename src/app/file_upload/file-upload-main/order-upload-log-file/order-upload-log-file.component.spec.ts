import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUploadLogFileComponent } from './order-upload-log-file.component';

describe('OrderUploadLogFileComponent', () => {
  let component: OrderUploadLogFileComponent;
  let fixture: ComponentFixture<OrderUploadLogFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUploadLogFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUploadLogFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
