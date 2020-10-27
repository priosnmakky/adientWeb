import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPrintPUSComponent } from './search-print-pus.component';

describe('SearchPrintPUSComponent', () => {
  let component: SearchPrintPUSComponent;
  let fixture: ComponentFixture<SearchPrintPUSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPrintPUSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPrintPUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
