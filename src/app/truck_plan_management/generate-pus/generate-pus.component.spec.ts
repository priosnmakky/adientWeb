import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePUSComponent } from './generate-pus.component';

describe('GeneratePUSComponent', () => {
  let component: GeneratePUSComponent;
  let fixture: ComponentFixture<GeneratePUSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePUSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
