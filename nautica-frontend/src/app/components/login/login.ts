import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import {LoginRequest, User} from '../../models/user.model';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;
  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    // After init of FormBuilder-a
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Handle login form submission
   */
  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.getRawValue();

    this.loginData = {
      username: formValue.username,
      password: formValue.password
    };

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.router.navigate(['/news']);
      },
      error: (error) => {
        const loginFailed = this.translate.instant('LOGIN_FAILED');
        this.errorMessage = error.error?.message || loginFailed;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
