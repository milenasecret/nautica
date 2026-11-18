import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginRequest, User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  // BehaviorSubject to track login status (reactive)
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Get current user from localStorage
   */
  private getUserFromStorage(): User | null {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('id');
    const email = localStorage.getItem('email');
    const isAdmin = localStorage.getItem('isAdmin');
    const isAdminBool: boolean = isAdmin === 'true';

    if (token && username && email && isAdminBool && id) {
      return { username:username, email:email, isAdmin:isAdminBool, id:Number(id)};
    }
    return null;
  }

  /**
   * Login user
   */
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  /**
   * forgot Password
   */
  forgotPassword(email: string): Observable<void> {
     return this.http.post<void>(`${this.apiUrl}/forgot-password`, {email: email});
  }

  /**
   * reset Password
   */
  resetPassword(
    token: string,
    newPassword: string
  ): Observable<string> {

    return this.http.post(
      `${this.apiUrl}/reset-password`,
      {
        token: token,
        newPassword: newPassword
      },
      {
        responseType: 'text'
      }
    );
  }

  /**
   * Handle authentication response (save token and user info)
   */
  private handleAuthResponse(response: AuthResponse): void {
    // Store in localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
    localStorage.setItem('isAdmin', String(response.isAdmin));
    localStorage.setItem('id', String(response.id));

    // Update current user subject
    this.currentUserSubject.next({
      username: response.username,
      email: response.email,
      id: response.id,
      isAdmin: response.isAdmin
    });
  }

  /**
   * Handle change current user response (save token and user info)
   */
   handleCurrentUserResponse(response: User): void {
    // Store in localStorage
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
    localStorage.setItem('id', String(response.id));
    localStorage.setItem('isAdmin', String(response.isAdmin));

    // Update current user subject
    this.currentUserSubject.next({
      username: response.username,
      email: response.email,
      isAdmin: response.isAdmin,
      id: response.id
    });
  }

  /**
   * Logout user
   */
  logout(): void {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('id');

    // Update current user subject
    this.currentUserSubject.next(null);

    // Navigate to news
    this.router.navigate(['/news']);
  }

  /**
   * Get JWT token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get current username
   */
  getCurrentUsername() {
    return this.currentUserSubject.value?.username;
  }

  /**
   * Get current user id
   */
  getCurrentUserId() {
    return this.currentUserSubject.value?.id;
  }

  adminIsLogged(): boolean {
    return this.currentUserSubject.value?.isAdmin === true;
  }
}
