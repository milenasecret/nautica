
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { User } from '../../../models/user.model';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-dialog-delete',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './user-dialog-delete.html',
  styleUrl: './user-dialog-delete.scss'
})
export class UserDialogDeleteComponent {
  messageToShow = '';
  userIdToDelete:number | null = null;

  constructor(
    private translate: TranslateService,
    private dialogRef: MatDialogRef<UserDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    if (data) {
      let firstName = data.firstname != null ? data.firstname : '';
      let lastName = data.lastname != null ? data.lastname : '';
      this.messageToShow = this.translate.instant('DELETE_USER_CONFIRMATION', {
        firstName: firstName,
        lastName: lastName,
        username: data.username
      });
      if (data.id != null) {
        this.userIdToDelete = data.id;
      }
    }
  }


  deleteUser(): void {
    this.dialogRef.close(this.userIdToDelete);
  }


  cancel(): void {
    this.dialogRef.close();
  }
}
