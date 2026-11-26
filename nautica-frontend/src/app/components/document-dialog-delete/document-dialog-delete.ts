import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Document} from '../../models/document.model';

@Component({
  selector: 'app-document-dialog-delete',
  imports: [CommonModule,
    TranslatePipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './document-dialog-delete.html',
  styleUrl: './document-dialog-delete.scss',
})
export class DocumentDialogDeleteComponent {
  messageToShow = '';
  documentToDelete: Document | null = null;

  constructor(
    private translate: TranslateService,
    private dialogRef: MatDialogRef<DocumentDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Document | null
  ) {
    if (data) {
      let title = data.filename != null ? data.filename : '';
      this.messageToShow = this.translate.instant('DELETE_FILE_CONFIRMATION') + ' ' + title;
      if (data.id != null) {
        this.documentToDelete = data;
      }
    }
  }

  deleteDocument(): void {
    this.dialogRef.close(this.documentToDelete);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
