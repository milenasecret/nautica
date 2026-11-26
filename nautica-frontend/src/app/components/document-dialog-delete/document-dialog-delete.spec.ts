import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDialogDeleteComponent as  DocumentDialogDelete} from './document-dialog-delete';

describe('DocumentDialogDelete', () => {
  let component: DocumentDialogDelete;
  let fixture: ComponentFixture<DocumentDialogDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentDialogDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDialogDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
