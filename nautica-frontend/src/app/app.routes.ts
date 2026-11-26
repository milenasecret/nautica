import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login';
import {authGuard} from './guards/auth-guard';
import {UsersComponent} from './components/users/users';
import {DocumentsComponent} from './components/documents/documents';
import {NewsComponent} from './components/news/news';
import {ForgotPasswordComponent} from './components/login/forgot-password/forgot-password';
import {ResetPasswordComponent} from './components/login/reset-password/reset-password';
import {ArticleDetailComponent} from './components/articles/article-detail/article-detail';
import {GalleryComponent} from './components/gallery/gallery';
import {PageTypeEnum} from './models/page.model';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'news', component: NewsComponent, data: { pageTypeEnum: PageTypeEnum.NEWS }},
  {path: 'home', component: NewsComponent, data: { pageTypeEnum: PageTypeEnum.HOME }},
  {path: 'gallery', component: GalleryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'documents', component: DocumentsComponent, canActivate: [authGuard]},
  {path: 'users', component: UsersComponent, canActivate: [authGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'articles/:id', component: ArticleDetailComponent},
  {path: '**', redirectTo: 'home'}
];
