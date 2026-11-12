import {Component, inject, OnInit} from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router
} from '@angular/router';

import {
  TranslatePipe,
  TranslateService
} from '@ngx-translate/core';
import {AuthService} from './services/auth';
import {User} from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  private router = inject(Router);

  menuOpen = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }

  getUserName(){
    return this.authService.getCurrentUser()?.username;
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
