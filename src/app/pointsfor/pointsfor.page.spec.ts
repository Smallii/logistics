import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsforPage } from './pointsfor.page';

describe('PointsforPage', () => {
  let component: PointsforPage;
  let fixture: ComponentFixture<PointsforPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsforPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
