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
import {MatIconModule} from '@angular/material/icon';
import {UserDialogComponent} from './components/users/user-dialog/user-dialog';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {UserService} from './services/user';
import {InfoPopupComponent} from './components/info-popup/info-popup';
import {MatTooltipModule} from '@angular/material/tooltip';
import {User} from './models/user.model';
import {filter, Observable, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  menuOpen = false;
  currentUser: User | null = null;

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

  getCurrentUsername(){
    return this.authService.getCurrentUsername();
  }

  getCurrentUserId(){
    return this.authService.getCurrentUserId();
  }

  loadUser(userId: number) {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.openPopup('Greška prilikom ucitavanja korisnika');
      }
    });
  }


  editCurrentUser(): void {
    const userId = this.getCurrentUserId();

    if (typeof userId !== 'number' || !Number.isFinite(userId)) {
      return;
    }
    this.userService.getUser(userId).pipe(
      tap(user => this.currentUser = user),
      switchMap(user => {
        const dialogRef = this.dialog.open(UserDialogComponent, {
          width: '500px',
          maxWidth: '95vw',
          maxHeight: '95vh',
          data: { ...user },
          autoFocus: false,
          panelClass: 'user-dialog-panel'
        });

        return dialogRef.afterClosed();
      }),
      filter(result => !!result),
      switchMap(result =>
        this.userService.updateCurrentUser(result).pipe(
          tap(() => this.authService.handleCurrentUserResponse(result))
        )
      )
    ).subscribe({
      next: () => {
        this.openPopup(this.translate.instant('USER_UPDATED'));
      },
      error: () => {
        this.openPopup('Greška prilikom izmene ulogovanog korisnika');
      }
    });
  }

  openPopup(messageToShow: string): void {
    const dialogRefDelete = this.dialog.open(InfoPopupComponent, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: messageToShow,
      autoFocus: false,
      panelClass: 'user-dialog-panel'
    });

  }
  adminIsLogged(){
    return this.authService.adminIsLogged();
  }

  userIsLogged(){
    return this.authService.isLoggedIn();
  }

  login(): void {
     this.router.navigate(['/login']);
  }
}
