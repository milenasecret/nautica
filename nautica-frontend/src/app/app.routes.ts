import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import {UsersComponent} from './components/users/users';
import {DocumentsComponent} from './components/documents/documents';
import {NewsComponent} from './components/news/news';
import {ForgotPasswordComponent} from './components/login/forgot-password/forgot-password';
import {ResetPasswordComponent} from './components/login/reset-password/reset-password';

export const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },

  { path: 'news', component: NewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocumentsComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'news' }
];
