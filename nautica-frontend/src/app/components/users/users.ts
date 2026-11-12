import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../services/user';
import {User} from '../../models/user.model';
import { MatButtonModule } from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormsModule } from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {UserDialogComponent} from './user-dialog/user-dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
    TranslatePipe,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent implements OnInit, AfterViewInit {
  // users: User[] = [];
  message = '';
  messageType: 'success' | 'error' = 'success';

  // Kolone koje prikazujemo u tabeli
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'address',
    'username',
    'email',
    'isAdmin',
    'actions'
  ];

  // Angular Material data source
  dataSource = new MatTableDataSource<User>([]);

  // Tekst pretrage
  searchText = '';

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    // Pretraga po više polja
    this.dataSource.filterPredicate = (
      user: User,
      filter: string
    ): boolean => {

      const searchValue = filter.toLowerCase();

      return (
        String(user.id ?? '').toLowerCase().includes(searchValue) ||
        (user.firstname ?? '').toLowerCase().includes(searchValue) ||
        (user.lastname ?? '').toLowerCase().includes(searchValue) ||
        (user.address ?? '').toLowerCase().includes(searchValue) ||
        user.username.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        (user.isAdmin ? 'admin administrator da' : 'korisnik ne').includes(searchValue)
      );
    };
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
      },
      error: () => {
        this.showMessage('Greška prilikom učitavanja korisnika');
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Pretraga
  applyFilter(): void {

    this.dataSource.filter = this.searchText.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Korisnici za prikaz na mobilnom telefonu
  get pagedUsers(): User[] {

    const filteredUsers = this.dataSource.filteredData;

    const pageIndex = this.paginator?.pageIndex ?? 0;
    const pageSize = this.paginator?.pageSize ?? 10;

    const startIndex = pageIndex * pageSize;

    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }

  // Otvaranje forme za dodavanje
  addUser(): void {

    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: null,
      autoFocus: false,
      panelClass: 'user-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.userService.createUser(result).subscribe({
        next: () => {
          this.showMessage('Korisnik je uspešno dodat');
          this.loadUsers();
        },
        error: () => {
          this.showMessage('Greška prilikom dodavanja korisnika');
        }
      });
    });
  }
  // Otvaranje forme za izmenu
  editUser(user: User): void {

    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: { ...user },
      autoFocus: false,
      panelClass: 'user-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.userService.updateUser(user.id!, result).subscribe({
        next: () => {
          this.showMessage('Korisnik je uspešno izmenjen');
          this.loadUsers();
        },
        error: () => {
          this.showMessage('Greška prilikom izmene korisnika');
        }
      });
    });
  }

  // Brisanje korisnika
  deleteUser(user: User): void {

    const confirmed = confirm(
      `Da li sigurno želiš da obrišeš korisnika ${user.username}?`
    );

    if (!confirmed) {
      return;
    }

    this.userService.deleteUser(user.id!).subscribe({
      next: () => {
        this.showMessage('Korisnik je uspešno obrisan');
        this.loadUsers();
      },
      error: () => {
        this.showMessage('Greška prilikom brisanja korisnika');
      }
    });
  }

  // Prikaz poruka
  showMessage(message: string): void {

    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
