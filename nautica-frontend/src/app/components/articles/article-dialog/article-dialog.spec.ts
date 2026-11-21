import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleDialog } from './add-article-dialog';

describe('AddArticleDialog', () => {
  let component: AddArticleDialog;
  let fixture: ComponentFixture<AddArticleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddArticleDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticleDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
