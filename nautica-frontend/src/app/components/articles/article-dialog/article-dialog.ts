import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Article} from '../../../models/article.model';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-article-dialog',
  standalone: true,
  imports: [
    CommonModule,
    QuillEditorComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './article-dialog.html',
  styleUrl: './article-dialog.scss',
})
export class ArticleDialogComponent {
  articleForm!: FormGroup;
  isEdit = false;
  articleId;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article | null
  ) {
    this.isEdit = !!data;

    // create form
    this.articleForm = this.fb.group({
      title: [''],
      shortDescription: [''],
      description: ['']
    });

    // for update fill form with existing data
    if (data) {
      this.articleId = data.id;
      this.articleForm.patchValue({
        title: data.title || '',
        shortDescription: data.shortDescription || '',
        description: data.description || ''
      });
    }
  }

  save(): void {
    const formValue = this.articleForm.getRawValue();

    const article: Partial<Article> = {
      title: formValue.title || null,
      shortDescription: formValue.shortDescription || null,
      description: formValue.description || null,
    };
    this.dialogRef.close(article);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
