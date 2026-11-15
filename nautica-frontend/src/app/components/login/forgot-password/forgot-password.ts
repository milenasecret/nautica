import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../../services/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    // After init of FormBuilder-a
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onForgotPassword(): void {
    this.errorMessage = '';
    this.isLoading = true;

    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const formValue = this.forgotPasswordForm.getRawValue();

    this.authService.forgotPassword(formValue.email).subscribe({
      next: (response) => {
        this.router.navigate(['/news']);
      },
      error: (error) => {
        const loginFailed = this.translate.instant('FORGOT_PASSWORD_FAILED');
        this.errorMessage = error.error?.message || loginFailed;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
