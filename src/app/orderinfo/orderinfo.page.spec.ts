import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderinfoPage } from './orderinfo.page';

describe('OrderinfoPage', () => {
  let component: OrderinfoPage;
  let fixture: ComponentFixture<OrderinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
