import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Article} from "../../../models/article.model";

@Component({
  selector: 'app-article-dialog-delete',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './article-dialog-delete.html',
  styleUrl: './article-dialog-delete.scss'
})
export class ArticleDialogDeleteComponent {
  messageToShow = '';
  articleIdToDelete: number | null = null;

  constructor(
    private translate: TranslateService,
    private dialogRef: MatDialogRef<ArticleDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article | null
  ) {
    if (data) {
      let title = data.title != null ? data.title : '';
      this.messageToShow = this.translate.instant('DELETE_ARTICLE_CONFIRMATION') + ' ' + title;
      if (data.id != null) {
        this.articleIdToDelete = data.id;
      }
    }
  }

  deleteArticle(): void {
    this.dialogRef.close(this.articleIdToDelete);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
