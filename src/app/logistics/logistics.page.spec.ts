import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsPage } from './logistics.page';

describe('LogisticsPage', () => {
  let component: LogisticsPage;
  let fixture: ComponentFixture<LogisticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
