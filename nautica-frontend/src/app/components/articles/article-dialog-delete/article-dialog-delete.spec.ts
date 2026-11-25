import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDialogDelete } from './article-dialog-delete';

describe('ArticleDialogDelete', () => {
  let component: ArticleDialogDelete;
  let fixture: ComponentFixture<ArticleDialogDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDialogDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleDialogDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
