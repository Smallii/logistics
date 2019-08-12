import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressPage } from './express.page';

describe('ExpressPage', () => {
  let component: ExpressPage;
  let fixture: ComponentFixture<ExpressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
