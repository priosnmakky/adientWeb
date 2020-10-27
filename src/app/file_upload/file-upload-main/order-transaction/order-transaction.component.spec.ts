import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTransactionComponent } from './order-transaction.component';

describe('OrderTransactionComponent', () => {
  let component: OrderTransactionComponent;
  let fixture: ComponentFixture<OrderTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
