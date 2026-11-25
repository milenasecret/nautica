import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Page} from '../../../models/page.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-page-edit',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './page-edit.html',
  styleUrl: './page-edit.scss',
})
export class PageEditDialogComponent {
  pageForm!: FormGroup;
  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PageEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Page | null
  ) {
    // create form
    this.pageForm = this.fb.group({
      title: [''],
    });
    if (data) {
      this.pageForm.patchValue({
        title: data.title || ''
      });
    }
  }

  savePage(): void {
    const formValue = this.pageForm.getRawValue();
    this.dialogRef.close(formValue.title || '');
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
