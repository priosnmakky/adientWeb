import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaechPrintTruckPlanComponent } from './seaech-print-truck-plan.component';

describe('SeaechPrintTruckPlanComponent', () => {
  let component: SeaechPrintTruckPlanComponent;
  let fixture: ComponentFixture<SeaechPrintTruckPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeaechPrintTruckPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeaechPrintTruckPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
