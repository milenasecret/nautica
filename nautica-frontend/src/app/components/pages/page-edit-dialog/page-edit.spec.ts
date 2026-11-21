import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEdit } from './page-edit';

describe('PageEdit', () => {
  let component: PageEdit;
  let fixture: ComponentFixture<PageEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
