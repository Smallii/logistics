import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersioninfoPage } from './versioninfo.page';

describe('VersioninfoPage', () => {
  let component: VersioninfoPage;
  let fixture: ComponentFixture<VersioninfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersioninfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersioninfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
