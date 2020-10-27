import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTruckPlanComponent } from './generate-truck-plan.component';

describe('GenerateTruckPlanComponent', () => {
  let component: GenerateTruckPlanComponent;
  let fixture: ComponentFixture<GenerateTruckPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateTruckPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTruckPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
