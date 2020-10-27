import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPartMasterComponent } from './order-part-master.component';

describe('OrderPartMasterComponent', () => {
  let component: OrderPartMasterComponent;
  let fixture: ComponentFixture<OrderPartMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPartMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPartMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
