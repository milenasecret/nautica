import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../../services/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  errorMessage = '';
  isLoading = false;
  hidePassword = true;
  token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    // After init of FormBuilder-a
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.token = <string>this.route.snapshot.queryParamMap.get('token');

    console.log('Token:', this.token);
  }

  onResetPassword(): void {
    this.errorMessage = '';
    this.isLoading = true;

    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const formValue = this.resetPasswordForm.getRawValue();

    this.authService.resetPassword(this.token, formValue.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = this.translate.instant('FORGOT_PASSWORD_FAILED');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
