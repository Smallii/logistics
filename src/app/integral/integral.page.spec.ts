import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegralPage } from './integral.page';

describe('IntegralPage', () => {
  let component: IntegralPage;
  let fixture: ComponentFixture<IntegralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
