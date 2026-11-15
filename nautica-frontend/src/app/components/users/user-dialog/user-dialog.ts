
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
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
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-user-dialog',
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
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.scss'
})
export class UserDialogComponent {

  userForm!: FormGroup;
  isEdit = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.isEdit = !!data;

    // Kreiranje forme nakon inicijalizacije FormBuilder-a
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      address: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      isAdmin: [false]
    });

    // Ako je izmena, popunjavamo formu postojećim podacima
    if (data) {
      this.userForm.patchValue({
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        address: data.address || '',
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin
      });
    } else {
      // Kod dodavanja novog korisnika password je obavezan
      this.userForm.controls['password'].addValidators(
        Validators.required
      );

      this.userForm.controls['password'].updateValueAndValidity();
    }
  }

  save(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.getRawValue();

    const user: Partial<User> = {
      firstname: formValue.firstname || null,
      lastname: formValue.lastname || null,
      address: formValue.address || null,
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
      isAdmin: formValue.isAdmin ?? false
    };

    this.dialogRef.close(user);
  }


  cancel(): void {
    this.dialogRef.close();
  }
}
