import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { authGuard } from './guards/auth-guard';
import {UsersComponent} from './components/users/users';
import {DocumentsComponent} from './components/documents/documents';
import {NewsComponent} from './components/news/news';

export const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },

  { path: 'news', component: NewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'news' }
];
